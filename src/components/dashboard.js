import React, { useState, useEffect, useRef } from 'react';
import UserAvatar from './userAvator';
import './dashboard.css';

// Import icons
import addIcon from './icons_FEtask/add.svg';
import displayIcon from './icons_FEtask/Display.svg';
import doneIcon from './icons_FEtask/Done.svg';
import highPriorityIcon from './icons_FEtask/Img-High-Priority.svg';
import mediumPriorityIcon from './icons_FEtask/Img-Medium-Priority.svg';
import lowPriorityIcon from './icons_FEtask/Img-Low-Priority.svg';
import noPriorityIcon from './icons_FEtask/No-priority.svg';
import urgentPriorityIcon from './icons_FEtask/SVG-Urgent-Priority-colour.svg';
import urgentPriorityGreyIcon from './icons_FEtask/SVG-Urgent-Priority-grey.svg';
import todoIcon from './icons_FEtask/To-do.svg';
import inProgressIcon from './icons_FEtask/in-progress.svg';
import backlogIcon from './icons_FEtask/Backlog.svg';
import cancelledIcon from './icons_FEtask/Cancelled.svg';
import moreIcon from './icons_FEtask/3-dot-menu.svg';
import downIcon from './icons_FEtask/down.svg';

// Icon mappings for easy access and maintenance
const Icons = {
  add: addIcon,
  display: displayIcon,
  done: doneIcon,
  highPriority: highPriorityIcon,
  mediumPriority: mediumPriorityIcon,
  lowPriority: lowPriorityIcon,
  noPriority: noPriorityIcon,
  urgentPriorityColor: urgentPriorityIcon,
  urgentPriority: urgentPriorityGreyIcon,
  todo: todoIcon,
  inProgress: inProgressIcon,
  backlog: backlogIcon,
  cancelled: cancelledIcon,
  more: moreIcon,
  down: downIcon
};

// Priority level mappings with corresponding icons
const PriorityIcons = {
  4: <img src={Icons.urgentPriority} alt="Urgent" className="icon-urgent" />,
  3: <img src={Icons.highPriority} alt="High" className="icon-high" />,
  2: <img src={Icons.mediumPriority} alt="Medium" className="icon-medium" />,
  1: <img src={Icons.lowPriority} alt="Low" className="icon-low" />,
  0: <img src={Icons.noPriority} alt="No Priority" className="icon-no-priority" />
};

const PriorityLabels = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority'
};

// Status icons mapping for ticket states
const StatusIcons = {
  'Todo': <img src={todoIcon} alt="Todo" className="status-todo" />,
  'In progress': <img src={inProgressIcon} alt="In Progress" className="status-progress" />,
  'Done': <img src={doneIcon} alt="Done" className="status-done" />,
  'Backlog': <img src={backlogIcon} alt="Backlog" className="status-backlog" />,
  'Canceled': <img src={cancelledIcon} alt="Canceled" className="status-canceled" />
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Fetch data and update localStorage when grouping/sorting changes
  useEffect(() => {
    fetchData();
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sorting', sorting);
  }, [grouping, sorting]);

  // Handle clicks outside the dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  // Fetch tickets and users data from API
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Helper to get priority value from label
  const getPriorityValue = (priorityLabel) => {
    return Object.entries(PriorityLabels).find(([key, value]) => value === priorityLabel)?.[0] || 0;
  };

  // Group tickets based on selected grouping option
  const groupTickets = (tickets) => {
    if (grouping === 'status') {
      return tickets.reduce((acc, ticket) => {
        acc[ticket.status] = [...(acc[ticket.status] || []), ticket];
        return acc;
      }, {});
    } else if (grouping === 'user') {
      return tickets.reduce((acc, ticket) => {
        const user = users.find(u => u.id === ticket.userId);
        acc[user?.name || 'Unassigned'] = [...(acc[user?.name || 'Unassigned'] || []), ticket];
        return acc;
      }, {});
    } else {
      return tickets.reduce((acc, ticket) => {
        acc[PriorityLabels[ticket.priority]] = [...(acc[PriorityLabels[ticket.priority]] || []), ticket];
        return acc;
      }, {});
    }
  };

  // Sort tickets based on selected sorting option
  const sortTickets = (tickets) => {
    return sorting === 'priority'
      ? [...tickets].sort((a, b) => b.priority - a.priority)
      : [...tickets].sort((a, b) => a.title.localeCompare(b.title));
  };

  const groupedTickets = groupTickets(tickets);
  
  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <div className="display-button-container">
          <button
            ref={buttonRef}
            onClick={() => setShowDropdown(!showDropdown)}
            className="display-button"
          >
            <img src={Icons.display} alt="Display" />
            <span>Display</span>
            <img src={Icons.down} alt="Toggle" />
          </button>

          {showDropdown && (
            <div ref={dropdownRef} className="display-dropdown">
              <div className="dropdown-section">
                <label className="dropdown-label">Grouping</label>
                <select
                  value={grouping}
                  onChange={(e) => setGrouping(e.target.value)}
                  className="dropdown-select"
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="dropdown-section">
                <label className="dropdown-label">Ordering</label>
                <select
                  value={sorting}
                  onChange={(e) => setSorting(e.target.value)}
                  className="dropdown-select"
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="kanban-board">
        {Object.entries(groupedTickets).map(([group, groupTickets]) => (
          <div key={group} className="kanban-column">
            <div className="column-header">
              <div className="column-header-left">
                {grouping === 'status' && StatusIcons[group]}
                {grouping === 'priority' && PriorityIcons[getPriorityValue(group)]}
                {grouping === 'user' && (
                  <UserAvatar user={users.find(u => u.name === group)} />
                )}
                <span className="column-title">{group}</span>
                <span className="ticket-count">{groupTickets.length}</span>
              </div>
              <div className="column-header-right">
                <button className="add-button">
                  <img src={Icons.add} alt="Add" />
                </button>
                <button className="more-button">
                  <img src={Icons.more} alt="More" />
                </button>               
              </div>
            </div>
            
            <div className="ticket-list">
              {sortTickets(groupTickets).map((ticket) => {
                const user = users.find(u => u.id === ticket.userId);
                
                return (
                  <div key={ticket.id} className="ticket-card">
                    <div className="ticket-header">
                      <span className="ticket-id">{ticket.id}</span>
                      {grouping !== 'user' && <UserAvatar user={user} />}
                    </div>
                    <div className="ticket-title-container">
                      {grouping !== 'status' && (
                        <div className="status-icon">
                          {StatusIcons[ticket.status]}
                        </div>
                      )}
                      <h3 className="ticket-title">{ticket.title}</h3>
                    </div>
                    <div className="ticket-footer">
                      {grouping !== 'priority' && PriorityIcons[ticket.priority]}
                      <div className="ticket-tag">
                        <div className='circle'> </div>
                        <span>{ticket.tag[0]}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;