        // ==UserScript==
        // @name         auto-refresh
        // @namespace    http://tampermonkey.net/
        // @version      0.1
        // @description  Fixed button, auto-refreshes websites in set delay
        // @author       Bartek
        // @match        https://fclm-portal.amazon.com/reports/*
        // ==/UserScript==

        //settings
        const size = 35;
        const timeout = 240;



        //html
        const btnEL = document.createElement('div')
        btnEL.textContent = timeout;
        btnEL.classList = 'refreshBtn';
        document.body.appendChild(btnEL);

        //style
        const style = document.createElement('style');
        style.innerHTML = `div.refreshBtn {
            position: fixed;
            top: 50px;
            right: 50px;
            box-sizing: border-box;
            background-color: rgb(177, 227, 177);
            color: rgb(59, 151, 59);
            font-family: arial;
            font-weight: 400;
            font-size: ${size * 0.5}px;
            line-height: ${size - size / 20}px;
            text-align: center;
            height: ${size}px;
            width: ${size}px;
            border: ${size / 20}px solid rgb(59, 151, 59);
            border-radius: 50%;
            cursor: pointer;
            opacity: 0.7;
            transition: .3s
        }
        div.refreshBtn.off {
            background-color: rgb(227, 177, 177);
            color: rgb(151, 59, 59);
            border-color: rgb(151, 59, 59);
        }
        div.refreshBtn:hover{
            transform: scale(1.3);
        }
        `

        //script
        let refreshDelay = timeout;
        let buttonFlag = true;
        const btnRefresh = document.querySelector('div.refreshBtn')


        let countdown = null;
        let refreshInterval = null;


        function startRefresh() {
            refreshDelay = timeout;
            btnRefresh.textContent = timeout;
            countdown = setInterval(() => {
                btnRefresh.textContent = --refreshDelay;
                if (refreshDelay < 1) {
                    location.reload();
            }
            }, 1000);
  //          refreshInterval = setTimeout(function () {
  //              location.reload();
   //         }, timeout * 1000);
        }

        function stopRefresh() {
            clearTimeout(refreshInterval);
            clearInterval(countdown);
            btnRefresh.textContent = 'R';
        }

        const refresh = function () {
            buttonFlag = !buttonFlag;
            btnEL.classList.toggle('off');

            if (buttonFlag) {
                startRefresh();
            } else {
                stopRefresh();
            }
        }

        startRefresh();

        btnEL.addEventListener('click', refresh);
        const ref = document.querySelector('script');
        ref.parentNode.insertBefore(style, ref);