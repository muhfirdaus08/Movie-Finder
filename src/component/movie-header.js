class MovieHeader extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const h1 = document.createElement('h1');
    h1.innerHTML = 'Movie<span>Finder.</span>';

    shadow.appendChild(h1);

    const style = document.createElement('style');
    style.textContent = `
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      h1 {
        font-size: 31.4px;
        font-weight: 500;
        color: white;
        width: 100%;
        background-color: rgb(17, 17, 17);
        padding-top: 20px;
        padding-left: 40px;
        padding-bottom: 20px;
        box-shadow: 0px 20px 93px 0px rgba(199, 155, 0, 0.28),
          0px 158px 158px 0px rgba(199, 155, 0, 0.09),
          0px 356px 214px 0px rgba(199, 155, 0, 0.05),
          0px 634px 253px 0px rgba(199, 155, 0, 0.01),
          0px 990px 277px 0px rgba(199, 155, 0, 0),
          0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      }

      h1 span {
        font-weight: 700;
        color: #c79b00;
      }
    `;

    shadow.appendChild(style);
  }
}

export default MovieHeader;
