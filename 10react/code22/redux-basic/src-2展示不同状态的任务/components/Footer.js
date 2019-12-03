import React from 'react'

const Footer = props => {
  return (
    <p>
      <button
        disabled={props.filter === 'all'}
        onClick={() => props.setFilter('all')}
      >
        ALL
      </button>{' '}
      <button
        disabled={props.filter === 'active'}
        onClick={() => props.setFilter('active')}
      >
        ACTIVE
      </button>{' '}
      <button
        disabled={props.filter === 'completed'}
        onClick={() => props.setFilter('completed')}
      >
        COMPLETED
      </button>
    </p>
  )
}

export default Footer
