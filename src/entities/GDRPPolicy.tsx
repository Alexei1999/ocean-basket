import { Transition } from "@headlessui/react";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react/effector-react.cjs";
import { Fragment, useState } from "react";

const onGDRPSet = createEvent();

const $isGDRPSetted = createStore(
  window.localStorage.getItem("GDRP") ?? null
).on(onGDRPSet, () => "setted");

onGDRPSet.watch(() => {
  window.localStorage.setItem("GDRP", "setted");
});

export const GDRPPolicy = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isGDRP = useStore($isGDRPSetted);

  return (
    <div className="fixed bottom-0 z-50">
      <Transition show={!isGDRP && isOpen} as={Fragment}>
        <div className="w-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full text-start align-middle transition-all relative shadow-700">
              <div className="flex justify-center content-center justify-items-center items-center p-5 bg-light md:rounded-2xl">
                <p className="text-sm text-body pr-8 whitespace-pre-line">
                  Продолжая пользоваться сайтом oceanbasket.ru, вы даете
                  согласие на использование файлов cookies (куки).
                </p>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onGDRPSet();
                  }}
                  className="text-accent hover:text-accent-hover font-bold"
                >
                  Принять
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </div>
  );
};
