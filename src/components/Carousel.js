import React,{useState} from 'react'

export default function Carousel({onFormSubmit}) {
    const [searchTerm, setSearchTerm] = useState('');


    return (
        <div style={{marginTop:"60px"}}>
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:'contain !important'}}>
                <div className="carousel-inner" style={{maxHeight:"350px"}} >
                    <div className =" carousel-caption  " style={{ zIndex: "9" }}>
                        <div className=" d-flex justify-content-center" >  {/* justify-content-center, copy this <form> from navbar for search box */}
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="search unthinkable.." aria-label="Search"  value={searchTerm}
                                onChange={(e)=>{setSearchTerm(e.target.value)} }  {...onFormSubmit(searchTerm)} />
                        </div>
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://source.unsplash.com/random/900x350/?night-view" className="d-block w-100  " style={{filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x350/?space" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x350/?ilustrations" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
            </div>


        </div>
    )
}
