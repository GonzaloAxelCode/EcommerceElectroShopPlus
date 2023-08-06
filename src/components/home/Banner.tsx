import React from "react";

const Banner = () => {
  return (
    <div className="relative bg-white overflow-hidden dark:bg-neutral-900">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
              Electronic shop
            </h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-zinc-300">
              Somos la solución que necesitabas brindándote los mejores
              productos y accesorios al mejor precio al alcance de tus manos de
              manera rápida.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100  ">
                        <img
                          src="https://www.todoelectronica.com/235137-large_default/kit-de-alarma-ajax-profesional-con-camara-ip-ethernet-y-gprs-grado-ii.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover "
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.todoelectronica.com/237022-large_default/control-de-accesos-y-presencia-facial-zkteco-con-software-incluido.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.todoelectronica.com/225200-large_default/control-de-accesos-ac105-por-tarjeta-em-rfid-apto-para-exterior.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.todoelectronica.com/236986-large_default/mini-camara-espia-4g-2mpx-full-hd-y-vision-nocturna.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.todoelectronica.com/236987-large_default/mini-camara-espia-4g-2mpx-full-hd-y-vision-nocturna.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.todoelectronica.com/img/cms/Camaras%20Espia/camara%20espia%204g.JPG"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.todoelectronica.com/235503-home_default/medidor-de-ambiente-multifuncion-peaktech-p-5035.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="inline-block text-center bg-orange-500 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-orange-600"
              >
                Shop Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
