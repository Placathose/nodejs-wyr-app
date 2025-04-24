import React from 'react'

function AnswerDrawer({children, selectedOptions}) {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        {children}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 content-start">
          {/* Sidebar content here */}
          {selectedOptions.length > 0 ? (
              selectedOptions.map((option, index) => (
                <li key={index}>Q{index + 1}: {option}</li>
              ))
          ): (
            <li>Nothing in the list</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default AnswerDrawer