import React, { useEffect, useRef } from 'react';

const Home = () => {
  const wordRef = useRef<HTMLDivElement>(null); // Specify the type of ref

  useEffect(() => {
    var words = [
      'Super Probe',
      'API แสดงข้อมูลต่างๆ',
      'ค่าฝุ่น PM 2.5 สภาพอากาศ อุณหภูมิและข้อมูลต่างๆ',
    ];
    var part: string = ''; // Explicitly declare the type of part
    var i = 0;
    var offset = 0;
    var len = words.length;
    var forwards = true;
    var skip_count = 0;
    var skip_delay = 15;
    var speed = 80;

    const wordflick = () => {
      return setInterval(() => {
        if (forwards) {
          if (offset >= words[i].length) {
            ++skip_count;
            if (skip_count === skip_delay) {
              forwards = false;
              skip_count = 0;
            }
          }
        } else {
          if (offset === 0) {
            forwards = true;
            i++;
            offset = 0;
            if (i >= len) {
              i = 0;
            }
          }
        }
        part = words[i].substr(0, offset);
        if (skip_count === 0) {
          if (forwards) {
            offset++;
          } else {
            offset--;
          }
        }
        if (wordRef.current) {
          wordRef.current.innerText = part;
        }
      }, speed);
    };

    const intervalId = wordflick();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div id="boxHome"></div>
      <div className="word" ref={wordRef}></div>
      <style>
        {`
          body {
            background: black url(http://fc01.deviantart.net/fs71/f/2012/160/b/9/stars_by_paulinemoss-d52un4e.jpg);
            animation: stars 205s linear alternate;
          }

          #boxHome {
            background: url(https://cdn.rawgit.com/ManzDev/cursos-assets/gh-pages/css3/earth-2.jpg);
            background-size: cover;
            border: 2px solid #000;
            border-radius: 50%;
            width: 200px;
            height: 200px;
            animation: movimiento 15s linear 0s infinite;
            box-shadow: 0 0 25px RGBA(255, 255, 255, 0.1), -8px -8px 15px #000 inset,
              2px 2px 25px #000 inset, -45px -45px 25px RGBA(0, 0, 0, 0.5) inset,
              25px 25px 45px RGBA(0, 0, 0, 0.45) inset;
            margin: 6em auto;
            transform: rotateX(6deg) rotateY(6deg) rotateZ(6deg);
          }

          @keyframes movimiento {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 355px 0;
            }
          }

          @keyframes stars {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 0 100%;
            }
          }

          .word {
            text-align:center;
            // background-color:red;
            margin: auto;
            //color: white;
            font: 700 normal 2.5em 'tahoma';
             color: white;
              text-align: center;
          }
        `}
      </style>
      
    </>
  );
};

export default Home;
