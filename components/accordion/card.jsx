'use client'
import React from 'react';
import { useCollapse } from 'react-collapsed'


function Card ( props ) {
    // const { title, expanded, adClass = "", type = "default" } = props;
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    return (
        <div className="card">
            <div {...getToggleProps()} className="card-header">
                <h2  className="card-title">
                    <span className={ `toggle-button ${isExpanded ? "expanded" : "collapsed"}` } style={ { height: 'auto' } }> { props.title }  </span>
                </h2>
               
            </div>
            <div  {...getCollapseProps()}>
                <div className="card-body">
                    { props.children }
                </div>
            </div>
            
      {/* <section {...getCollapseProps()}>{props.children}</section> */}
    </div>
    );
}

export default React.memo( Card );