// src/pages/api/bid.js

export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    try {
      // Extract the bid request from the 'data' field
      const bidRequest = req.body.data;
      if (!bidRequest || !bidRequest.id || !bidRequest.imp) {
        return res.status(400).json({ error: 'Invalid bid request' });
      }
  
      // Generate a bid response
      const bidResponse = generateBidResponse(bidRequest);
  
      if (bidResponse) {
        res.status(200).json(bidResponse);
      } else {
        res.status(204).end(); // No bid
      }
    } catch (error) {
      console.error('Error processing bid request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  function generateBidResponse(bidRequest) {
    // Process each impression (though your example has only one)
    const seatbid = bidRequest.imp.map((imp) => {
      // Check if this is a banner impression we want to bid on
      if (!imp.banner || imp.bidfloor > 0.5) { // Example: Don't bid if floor > $0.50
        return null;
      }
  
      const bidPrice = calculateBidPrice(imp);
      if (bidPrice <= 0) {
        return null;
      }
  
      return {
        bid: [{
          id: `bid-${Date.now()}-${imp.id}`, // Unique bid ID
          impid: imp.id, // Match the impression ID
          price: bidPrice, // Bid price
          adm: generateAdMarkup(imp), // Ad markup
          nurl: 'http://yourserver.com/winnotice', // Win notification URL
          crid: 'creative-123', // Creative ID (optional)
          w: imp.banner.w, // Width from the impression
          h: imp.banner.h // Height from the impression
        }]
      };
    }).filter(Boolean); // Remove null entries (no bids)
  
    // If we have bids, construct the response
    if (seatbid.length > 0) {
      return {
        id: bidRequest.id, // Echo the request ID
        seatbid: seatbid,
        bidid: `bid-resp-${Date.now()}`, // Unique response ID
        cur: bidRequest.imp[0].bidfloorcur || 'USD' // Currency from bidfloorcur
      };
    }
  
    return null; // No bids
  }
  
  function calculateBidPrice(imp) {
    // Simple bidding logic: bid slightly above the floor price
    const bidFloor = imp.bidfloor || 0;
    const bidPrice = bidFloor + 0.01; // Bid $0.01 above floor
    return Number(bidPrice.toFixed(2)); // Round to 2 decimal places
  }
  
  function generateAdMarkup(imp) {
    // Generate HTML ad markup based on the banner dimensions
    const { w, h } = imp.banner;
    return `
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<script type="text/javascript">
    var clickTag = "http://m.me/savoybd";
</script>

  <style>
    * {
    margin: 0;
    padding: 0;
    user-select: none;
  }
  
  body {
    right: 0;
    left: 0;
    margin: auto;
    width: 100%;
    max-width: 300px;
    height: 250px;
    position: relative;
    overflow: hidden;
  }
  
  .hidden {
    display: none;
  }
  
  .bor {
    border: 5px solid red;
  }
  
  .borb {
    border: 5px solid blue;
  }
  
  .hidden0 {
    display: none;
    opacity: 0;
  }
  
  .Wrapper {
    width: 300px;
    height: 250px;
    right: 0;
    left: 0;
    margin: auto;
    position: relative;
    overflow: hidden;
  }
  
  .slide1 {
    width: 300px;
    height: 250px;
    top: 0;
    left: 0;
  }
  
  .pack {

    left: 0;
    bottom:0;
    position: absolute;
    z-index: 999;
  }
  
  .right{
    right: 0;
    top:0;
    position: absolute;
  
  }
  
  .logo {
    margin: auto;
    right: 1rem;
    top: 1rem;
    position: absolute;
    z-index: 9992;
  }
  .food {

    left: 0;
    bottom: 0;
    position: absolute;
    z-index: 9992;
  }
  .text {

    top: 0;
    right:0;
    position: absolute;
  }
  .text2 {

    top:0;
    right:0;
    z-index: 9999999;
    position: absolute;
  }
  
  
  .bg {
    width: 300px;
    height: 250px;
    top: 0;
    left: 0;
  }
  
  .model {
    bottom: 0;
    right:0;
    position: absolute;
  }
  
  .hideHeight {
    animation: hideHeight 0.65s linear ease-out;
  }
  @keyframes hideHeight {
    from {
      opacity: 0;
        width: 0px;
    }
  
    to {
      opacity: 1;
        width: 20px;
    }
  }
  
  .rotateScale {
    animation: rotate-scale-up 0.65s linear both;
  }
  
  @keyframes rotate-scale-up {
    0% {
        transform: scale(1) rotateZ(0);
    }
  
    50% {
        transform: scale(2) rotateZ(180deg);
    }
  
    100% {
        transform: scale(1) rotateZ(360deg);
    }
  }
  
  
  .showZoomInLeft {
    animation-name: showZoomInLeft;
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  
  @keyframes showZoomInLeft {
    0% {
      transform: translateX(-200%);
    }
  
    100% {
      transform: translateX(-0%);
    }
  }
  
  .showZoomInRight {
    animation-name: showZoomInRight;
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  
  @keyframes showZoomInRight {
    0% {
      transform: translateX(200%);
    }
  
    100% {
      transform: translateX(0%);
    }
  }
  
  .showZoomInBottom {
    animation-name: showZoomInBottom;
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  
  @keyframes showZoomInBottom {
    0% {
      transform: translateY(200%);
    }
  
    100% {
      transform: translateY(0%);
    }
  }
  
  .zoomOutBottom {
    animation-name: zoomOutBottom;
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  
  @keyframes zoomOutBottom {
    0% {
      transform: translateY(0%);
    }
  
    100% {
      transform: translateY(200%);
    }
  }
  
  .ZoomOutRight {
    animation-name: ZoomOutRight;
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  
  @keyframes ZoomOutRight {
    0% {
      transform: translateX(0%);
    }
  
    100% {
      transform: translateX(200%);
    }
  }
  
  @keyframes showZoomIn {
    from {
      transform: scale3d(0.5, 0.5, 0.5);
    }
  
    to {
      transform: scale3d(1, 1, 1);
    }
  }
  
  .showZoomIn {
    animation-name: showZoomIn;
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale3d(0.1, 0.1, 0.1);
    }
  
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }
  
  .fadeIn {
    animation-name: fadeIn;
    animation-duration: 0.8s;
    animation-timing-function: ease-in;
  }
  
  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  
    100% {
      opacity: 0;
      transform: scale3d(0.1, 0.1, 0.1);
    }
  }
  
  .fadeOut {
    animation-name: fadeOut;
    animation-duration: 1s;
    animation-timing-function: ease-out;
  }
  
  #adfinixAdLogo {
    background: #ededed;
    opacity: 0.8;
    transition: 0.2s;
    position: absolute;
    bottom: 0;
    display: inline-flex;
    right: 0;
    text-decoration: none;
    padding: 3px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Ubuntu, "Helvetica Neue", Oxygen, Cantarell, sans-serif;
    align-items: center;
    z-index: 999999;
  }
  
  #adfinixAdLogo img {
    width: 15px;
    height: 15px;
  }
  
  #adfinixAdLogo span {
    width: 0px;
    transition: 0.2s;
    margin-left: 2px;
    display: inline-block;
    font-size: 10px;
    visibility: hidden;
  }
  
  #adfinixAdLogo:hover {
    opacity: 1;
  }
  
  #adfinixAdLogo:hover span {
    width: 35px;
    visibility: visible;
  }
  
  @media (max-width: 299px) {
    body {
      overflow: hidden;
      transform: scale(0.85, 0.85);
      margin: 0;
      padding: 0;
      text-align: center;
      transform-origin: top left;
    }
  }
  
  @media (max-width: 250px) {
    body {
      overflow: hidden;
      transform: scale(0.79, 0.79);
      margin: 0;
      padding: 0;
      text-align: center;
      transform-origin: top left;
    }
  }
  
  .heartbeat {
    -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
    animation: heartbeat 1.5s ease-in-out infinite both;
  }
  
  @-webkit-keyframes heartbeat {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center center;
      transform-origin: center center;
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  
    10% {
      -webkit-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
  
    17% {
      -webkit-transform: scale(0.98);
      transform: scale(0.98);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  
    33% {
      -webkit-transform: scale(0.87);
      transform: scale(0.87);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
  
    45% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
  
  @keyframes heartbeat {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center center;
      transform-origin: center center;
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  
    10% {
      -webkit-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
  
    17% {
      -webkit-transform: scale(0.98);
      transform: scale(0.98);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  
    33% {
      -webkit-transform: scale(0.87);
      transform: scale(0.87);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
  
    45% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
  
  
  .bounce {
    animation: bounce 1.1s both;
  }
  
  
  @keyframes bounce{
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
    }
  
    38% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
    }
  
    55% {
      -webkit-transform: scale(0.7);
      transform: scale(0.7);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
  
    72% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  
    81% {
      -webkit-transform: scale(0.84);
      transform: scale(0.84);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
  
    89% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  
    95% {
      -webkit-transform: scale(0.95);
      transform: scale(0.95);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
  
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
  
  @keyframes animate {
    0% {
      transform: translateY(0) scaleX(1);
      opacity: 0;
    }
  
    15% {
      opacity: 1;
    }
  
    50% {
      transform: translateY(-20px) scaleX(5);
    }
  
    95% {
      opacity: 0;
    }
  
    100% {
      transform: translateY(-60px) scaleX(10);
    }
  }
  </style>

  <div class="Wrapper" style="cursor: pointer">
    <div class="slide1" onclick="window.open(clickTag)" >
      <img class="bg"
        src="https://adfinix-ads.sgp1.cdn.digitaloceanspaces.com/savoy300250200225/savoy300250200225/img/bg.png"
        alt="bg" />
      <img class="model showZoomInRight"
        src="https://adfinix-ads.sgp1.cdn.digitaloceanspaces.com/savoy300250200225/savoy300250200225/img/left.png"
        alt="" />
      <img class="text"
        src="https://adfinix-ads.sgp1.cdn.digitaloceanspaces.com/savoy300250200225/savoy300250200225/img/mnemonic.png"
        alt="" />
      <img class="pack bounce"
        src="https://adfinix-ads.sgp1.cdn.digitaloceanspaces.com/savoy300250200225/savoy300250200225/img/pack.png"
        alt="" />
      <img class="text2"
        src="https://adfinix-ads.sgp1.cdn.digitaloceanspaces.com/savoy300250200225/savoy300250200225/img/purotaiaam.png"
        alt="" />
      <img class="right showZoomInLeft"
        src="https://adfinix-ads.sgp1.cdn.digitaloceanspaces.com/savoy300250200225/savoy300250200225/img/right.png"
        alt="" />
      <img class="logo rotateScale"
        src="https://adfinix-ads.sgp1.cdn.digitaloceanspaces.com/savoy300250200225/savoy300250200225/img/savoylogo.png"
        alt="" />
    </div>

    <a id="adfinixAdLogo" href="https://adfinix.com" target="_blank" noreferrer noopener>
      <img src="https://content.adfinix.com/adfinix-static/20x20px.png" alt="Adfinix logo" />
      <span>Adfinix</span>
    </a>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.1/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.1/Draggable.min.js"></script>
  <script>
    let text = document.querySelector(".text");
    let text2 = document.querySelector(".text2");
    gsap.timeline({ delay: 0.5, repeat: -1, repeatDelay: 0.1 })
      .fromTo(".text", { opacity: 0, display: "none", y: -200 }, { opacity: 1, display: "block", duration: 0.7, y: 0 }, "<")
      .fromTo(".pack", { opacity: 0, display: "none", x: -200 }, { opacity: 1, display: "block", duration: 0.7, x: 0 }, ">")
      .fromTo(".right", { opacity: 0, display: "none", x: 200 }, { opacity: 1, display: "block", duration: 0.7, x: 0 }, ">")
      .fromTo(".model", { opacity: 0, display: "none" }, { opacity: 1, display: "block", duration: 0.7 }, ">")
      .fromTo(".text2", 0.5, { display: "none", opacity: 0, y: "100%", scale: 0.1, rotate: "360deg", }, { display: "block", opacity: 1, scale: 1, y: "0%", rotate: "0deg", ease: "back.out(1)", }, ">")
      .to(".text2", { scaleX: 0.9, scaleY: 0.9, duration: 0.7, repeat: 8, yoyo: true }, ">.2")
  </script>
<script async src="https://content-adfinix.sgp1.digitaloceanspaces.com/adfinix-track.js#adf-id=%%ADF-PARAM%%&sizex=250&sizey=300"
type="text/javascript"></script>
    `;
  }