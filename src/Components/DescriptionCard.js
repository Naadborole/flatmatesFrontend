import React, { useState } from "react";
import "../assets/styles/Carousel.css";
import "../tailwind.css";
import ImageCarousel from "../Shared/ImageCarousel/ImageCarousel"

export default function DescriptionCard(props) {

    return (
    <>

    <div className="-mb-24">
            <div className="app bg-white">
        
              <div class="flex-auto px-4 lg:px-10 py-0 pt-0">
                    <h6 class="text-blueGray-700 text-xl font-bold py-4">Description</h6>
              </div>

              <hr class="mt-0 border-b-1 border-blueGray-300" />
          
              <div class="flex-auto px-4 lg:px-10 py-10 pt-0">

                <div class="text-justify flex justify-between py-1">
                    <p class="text-blueGray-600 text-lg py-2">{props.value.description}</p>
                </div>

                <hr class="mt-6 border-b-1 border-blueGray-100" />

                <div class="flex flex-wrap">
                  <div class="w-full lg:w-4/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-400 text-lg py-0">Rent : </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full lg:w-8/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-600 text-lg py-0">{props.value.rent}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="mt-0 border-b-1 border-blueGray-100" />

                <div class="flex flex-wrap">
                  <div class="w-full lg:w-4/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-400 text-lg py-0">Vacancy : </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full lg:w-8/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-600 text-lg py-0">{props.value.vacancy}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="mt-0 border-b-1 border-blueGray-100" />

                <div class="flex flex-wrap">
                  <div class="w-full lg:w-4/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-400 text-lg py-0">Gender : </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full lg:w-8/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-600 text-lg py-0">{props.value.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="mt-0 border-b-1 border-blueGray-100" />

                <div class="flex flex-wrap">
                  <div class="w-full lg:w-4/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-400 text-lg py-0">Area : </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full lg:w-8/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-600 text-lg py-0">{props.value.addressline1}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="mt-0 border-b-1 border-blueGray-100" />

                <div class="flex flex-wrap">
                  <div class="w-full lg:w-4/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-400 text-lg py-0">Address Line : </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full lg:w-8/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-600 text-lg py-0">{props.value.addressline2}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="mt-0 border-b-1 border-blueGray-100" />

                <div class="flex flex-wrap">
                  <div class="w-full lg:w-4/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-400 text-lg py-0">City :  </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full lg:w-8/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-600 text-lg py-0">{props.value.city}</p>
                      </div>
                    </div>
                  </div>
                </div> 

                <hr class="mt-0 border-b-1 border-blueGray-100" />

                <div class="flex flex-wrap">
                  <div class="w-full lg:w-4/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-400 text-lg py-0">State : </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full lg:w-8/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-600 text-lg py-0">{props.value.state}</p>
                      </div>
                    </div>
                  </div>
                </div> 

                <hr class="mt-0 border-b-1 border-blueGray-100" />

                <div class="flex flex-wrap">
                  <div class="w-full lg:w-4/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-400 text-lg py-0">Profession : </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full lg:w-8/12 px-0">
                    <div class="relative w-full mb-0">
                      <div class="text-justify flex justify-between py-1">
                        <p class="text-blueGray-600 text-lg py-0">{props.value.profession}</p>
                      </div>
                    </div>
                  </div>
                </div>  

                <hr class="mt-0 border-b-1 border-blueGray-100" />

              </div> 
            </div>)
        </div>

    </>
      );
    }