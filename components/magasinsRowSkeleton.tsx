

export default function MagasinRowSkeleton(){

    return(
        <div className=" skeleton-body">
        <div className=" skel-pro-single">  
        <div className="skel-magasins-gallery overflow-x-scroll flex">
              { new Array( 30 ).fill( 1 ).map( ( item, index ) => (
                  <div className="skel-magasin-item flex-none" key={ "Skeleton" + index }> <div className="skel-magasin-item-rounded"> </div>  <div className="skel-magasin-item-line"> </div> </div>
              ) )}
          </div>
          </div>
          </div>
    )
}