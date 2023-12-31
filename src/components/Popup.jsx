import React from 'react';
const Popup = () => {
  const style = {
    popup: ` text-black flex items-center `,
    box_popup: `bg-gray-200 flex  rounded-xl h-40 w-fit hover:drop-shadow-xxl`,
    title_header: `text-black font-form text-2xl p-2`,
    logo_popup: `flex flex-row items-center px-4 `,
    content_popup2: ` flex flex-col text-white`,
    description_popup: `text-left p-2 text-black`,
    svg_popup: `fill-black`,
  };

  return (
    <div className="h-full pt-20 flex justify-center items-center">
      <div className={style.box_popup}>
        <div className={style.logo_popup}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={style.svg_popup}
            height="100"
            viewBox="0 96 960 960"
            width="100"
          >
            <path d="m40 936 440-760 440 760H40Zm104-60h672L480 296 144 876Zm340.175-57q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM454 708h60V484h-60v224Zm26-122Z" />
          </svg>
        </div>
        <div className={style.content_popup2}>
          <div>
            <p className={style.title_header}>Account Not Connected</p>
          </div>
          <div>
            <p className={style.description_popup}>
              Please Connect Your Metamask wallet. After Connecting wallet
              content is visible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
