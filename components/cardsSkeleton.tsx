

export default function CardSkeleton(){

    return(
        <div className=" skeleton-body">
        <div className=" skel-pro-single">  
        <div className="skel-cards-gallery container">
        { new Array( 6 ).fill( 1 ).map( ( item, index ) => (
          <div className="skel-card-item" key={ "Skeleton" + index }>
              <div className="skel-card-item-title"> </div> 
              <div className="skel-card-catalog-items">
              { new Array( 6 ).fill( 1 ).map( ( item, index ) => (
                <div className="skel-card-catalog-item" key={ "Skeleton" + index }> 
                </div>
            ) )}
            </div>
          </div>
        ) )}
        </div>
        </div>
        </div>
    )
}