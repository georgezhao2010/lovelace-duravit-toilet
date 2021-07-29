const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class DuravitToilet extends LitElement {
  constructor(){
    super();
  }

  static get properties() {
    return {
      _hass: {},
      config: {},
      entity: {},
    };
  }

  static get styles(){
    return css;
  }

  set hass(hass){
    if(!hass) return;
    const entity = hass.states[this.config.entity];
    this._hass = hass;
    if (entity && this._entity !== entity) {
      this.entity = entity;
    }
  }

  get hass(){
    return this._hass;
  }

  render() {
    const toilet = this._hass.states[this.config.entity]
    return toilet
      ? html`
        <ha-card>
          <div class="duravit-toilet__bg"></div>
          <div class="duravit-toilet">
            <div class="duravit-toilet__core flex" @click="${this.onRowClick}">
              <div class="entity__icon">
                <ha-icon .icon=${toilet.attributes.icon}></ha-icon>
              </div>
              <div class="entity__info">
                <div class='entity__info__name'>
                  ${toilet.attributes.friendly_name}
                </div>
              </div>
              <div class="duravit-toilet__state">
                  ${toilet.state}
              </div>
            </div>
            <div class="flex">
              <div class="duravit-toilet__function">
                座圈加热
              </div>
              <div class="duravit-toilet__left">
                ${this.makeBarlevel(toilet.attributes.seat_heating, 3)}
              </div>
              <div class="duravit-toilet__right">
                <div class="${toilet.attributes.seat_heating > 0?'':'inactive_icon'}">
                  <ha-icon-button icon="mdi:minus-circle-outline"
                    @click=${()=>this._sendCommand_Cond(toilet, "seat_heating", toilet.attributes.seat_heating - 1, 3)}>
                  </ha-icon-button>
                </div>
                <div class="${toilet.attributes.seat_heating < 3?'':'inactive_icon'}">
                  <ha-icon-button icon="mdi:plus-circle-outline"
                    @click=${()=>this._sendCommand_Cond(toilet, "seat_heating", toilet.attributes.seat_heating + 1, 3)}>
                  </ha-icon-button>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="duravit-toilet__function">
                冲洗温度
              </div>
              <div class="duravit-toilet__left">
                ${this.makeBarlevel(toilet.attributes.wash_temperature, 3)}
              </div>
              <div class="duravit-toilet__right">
                <div class="${toilet.attributes.wash_temperature > 0?'':'inactive_icon'}">
                  <ha-icon-button icon="mdi:minus-circle-outline"
                    @click=${()=>this._sendCommand_Cond(toilet, "wash_temperature", toilet.attributes.wash_temperature - 1, 3)}>
                  </ha-icon-button>
                </div>
                <div class="${toilet.attributes.wash_temperature < 3?'':'inactive_icon'}">
                  <ha-icon-button icon="mdi:plus-circle-outline"
                    @click=${()=>this._sendCommand_Cond(toilet, "wash_temperature", toilet.attributes.wash_temperature + 1, 3)}>
                  </ha-icon-button>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="duravit-toilet__function">
                冲洗位置
              </div>
              <div class="duravit-toilet__left">
                ${this.makeBarlevel(4 - toilet.attributes.wash_position, 4)}
              </div>
              <div class="duravit-toilet__right">
                <div class="${toilet.attributes.wash_position < 4?'':'inactive_icon'}">
                  <ha-icon-button icon="mdi:arrow-left-circle-outline"
                    @click=${()=>this._sendCommand_Cond(toilet, "wash_position", toilet.attributes.wash_position + 1, 4)}>
                  </ha-icon-button>
                </div>
                <div class="${toilet.attributes.wash_position > 0?'':'inactive_icon'}">
                  <ha-icon-button icon="mdi:arrow-right-circle-outline"
                    @click=${()=>this._sendCommand_Cond(toilet, "wash_position", toilet.attributes.wash_position - 1, 4)}>
                  </ha-icon-button>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="duravit-toilet__function">
                冲洗强度
              </div>
              <div class="duravit-toilet__left">
                ${this.makeBarlevel(toilet.attributes.wash_intensity, 2)}
              </div>
              <div class="duravit-toilet__right">
                <div class="${toilet.attributes.wash_intensity > 0?'':'inactive_icon'}">
                  <ha-icon-button icon="mdi:minus-circle-outline"
                    @click=${()=>this._sendCommand_Cond(toilet, "wash_intensity", toilet.attributes.wash_intensity - 1, 2)}>
                  </ha-icon-button>
                </div>
                <div class="${toilet.attributes.wash_intensity < 2?'':'inactive_icon'}">
                  <ha-icon-button icon="mdi:plus-circle-outline"
                    @click=${()=>this._sendCommand_Cond(toilet, "wash_intensity", toilet.attributes.wash_intensity + 1, 2)}>
                  </ha-icon-button>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="duravit-toilet__function">
                烘干温度
              </div>
              <div class="duravit-toilet__left">
                ${this.makeBarlevel(toilet.attributes.drying_temperature, 3)}
              </div>
              <div class="duravit-toilet__right">
                <div class="${toilet.attributes.drying_temperature > 0?'':'inactive_icon'}">
                  <ha-icon-button icon="mdi:minus-circle-outline"
                    @click=${()=>this._sendCommand_Cond(toilet, "drying_temperature", toilet.attributes.drying_temperature - 1, 3)}>
                  </ha-icon-button>
                </div>
                <div class="${toilet.attributes.drying_temperature < 3?'':'inactive_icon'}">
                  <ha-icon-button icon="mdi:plus-circle-outline"
                    @click=${()=>this._sendCommand_Cond(toilet, "drying_temperature", toilet.attributes.drying_temperature + 1, 3)}>
                  </ha-icon-button>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="duravit-toilet__left">
                <ha-icon-button icon="mdi:door-closed-lock"
                  @click=${()=>this._sendCommand(toilet, "holiday_mode")}>
                </ha-icon-button>
                <ha-icon-button icon="mdi:auto-fix"
                  @click=${()=>this._sendCommand(toilet, "rinse_auto")}>
                </ha-icon-button>
                <ha-icon-button icon="mdi:cogs"
                  @click=${()=>this._sendCommand(toilet, "rinse_manually")}>
                </ha-icon-button>
              </div>
              <div class="duravit-toilet__right">
                <ha-icon-button icon="mdi:fountain"
                  @click=${()=>this._sendCommand(toilet, "rear_wash")}>
                </ha-icon-button>
                <ha-icon-button icon="mdi:face-woman-outline"
                  @click=${()=>this._sendCommand(toilet, "lady_wash")}>
                </ha-icon-button>
                <ha-icon-button icon="mdi:fan"
                  @click=${()=>this._sendCommand(toilet, "drying")}>
                </ha-icon-button>
                <ha-icon-button icon="mdi:stop"
                  @click=${()=>this._sendCommand(toilet, "stop")}>
                </ha-icon-button>
              </div>
            </div>
          </div>
        </ha-card>`
      : html`<div class="not-found">Entity ${this.config.entity} not found.</div>`  ;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You should define a entity");
    }
    this.onRowClick = this.clickHandler(config.entity, config.tap_action);
    this.config = deepCopy(config);
  }

  getCardSize() {
    return 1;
  }

  makeBarlevel(cur, max){
    switch(max)
    {
      case 2:
        return  html`
          <div class="bar ${cur>0?'active_bar':'inactive_bar'}"></div>
          <div class="bar ${cur>1?'active_bar':'inactive_bar'}"></div>
        `;
      case 3:
        return  html`
          <div class="bar ${cur>0?'active_bar':'inactive_bar'}"></div>
          <div class="bar ${cur>1?'active_bar':'inactive_bar'}"></div>
          <div class="bar ${cur>2?'active_bar':'inactive_bar'}"></div>
        `;
      case 4:
        return  html`
          <div class="bar ${cur>0?'active_bar':'inactive_bar'}"></div>
          <div class="bar ${cur>1?'active_bar':'inactive_bar'}"></div>
          <div class="bar ${cur>2?'active_bar':'inactive_bar'}"></div>
          <div class="bar ${cur>3?'active_bar':'inactive_bar'}"></div>
        `;
    }
    return html``;
  }

  _sendCommand(toilet, command, data){
    this.hass.callService("duravit_toilet", "send_command", {
      entity_id: toilet.entity_id,
      command: command,
      data: data
    });
  }

  _sendCommand_Cond(toilet, command, data, max){
    if(data >= 0 && data <= max){
      this._sendCommand(toilet, command, data);
    }
  }

  clickHandler(entity, actionConfig) {
    return () => handleClick(this, this.hass, { entity, tap_action: actionConfig }, false, false);
  }

  static get styles() {
    return css`
      ha-slider {
        width: 100%;
        min-width: 80px;
      }
      
      .duravit-toilet{
        align-self: flex-end;
        box-sizing: border-box;
        position: relative;
        padding: 16px;
        transition: padding .25s ease-out;
        width: 100%;
        will-change: padding;
      }
      .duravit-toilet__bg {
        background: var(--ha-card-background, var(--card-background-color, var(--paper-card-background-color, white)));
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        overflow: hidden;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: var(--mmp-bg-opacity);
      }
      
      .{
        align-self: flex-end;
        box-sizing: border-box;
        position: relative;
        padding: 16px;
        transition: padding 0.25s ease-out 0s;
        width: 100%;
        will-change: padding
      }
      
      .duravit-toilet__core {
         position: relative;
      }
      
      :host {
        overflow: visible !important;
        display: block;
        --duravit-toilet-scale: var(--mini-media-player-scale, 1);
        --duravit-toilet-unit: calc(var(--duravit-toilet-scale) * 40px);
        --duravit-toilet-name-font-weight: var(--mini-media-player-name-font-weight, 400);
        --duravit-toilet-accent-color: var(--mini-media-player-accent-color, var(--accent-color, #f39c12));
        --duravit-toilet-base-color: var(--mini-media-player-base-color, var(--primary-text-color, #000));
        --duravit-toilet-overlay-color: var(--mini-media-player-overlay-color, rgba(0,0,0,0.5));
        --duravit-toilet-overlay-color-stop: var(--mini-media-player-overlay-color-stop, 25%);
        --duravit-toilet-overlay-base-color: var(--mini-media-player-overlay-base-color, #fff);
        --duravit-toilet-overlay-accent-color: var(--mini-media-player-overlay-accent-color, --duravit-toilet-accent-color);
        --duravit-toilet-text-color: var(--mini-media-player-base-color, var(--primary-text-color, #000));
        --duravit-toilet-media-cover-info-color: var(--mini-media-player-media-cover-info-color, --duravit-toilet-text-color);
        --duravit-toilet-text-color-inverted: var(--disabled-text-color);
        --duravit-toilet-active-color: var(--duravit-toilet-active-color);
        --duravit-toilet-button-color: var(--mini-media-player-button-color, rgba(255,255,255,0.25));
        --duravit-toilet-icon-color:
          var(--mini-media-player-icon-color,
            var(--mini-media-player-base-color,
              var(--paper-item-icon-color, #44739e)));
        --duravit-toilet-icon-active-color: var(--paper-item-icon-active-color, --duravit-toilet-active-color);
        --duravit-toilet-info-opacity: 0.75;
        --duravit-toilet-bg-opacity: var(--mini-media-player-background-opacity, 1);
        --duravit-toilet-artwork-opacity: var(--mini-media-player-artwork-opacity, 1);
        --duravit-toilet-progress-height: var(--mini-media-player-progress-height, 6px);
        --mdc-theme-primary: var(--duravit-toilet-text-color);
        --mdc-theme-on-primary: var(--duravit-toilet-text-color);
        --paper-checkbox-unchecked-color: var(--duravit-toilet-text-color);
        --paper-checkbox-label-color: var(--duravit-toilet-text-color);
        color: var(--duravit-toilet-text-color);
      }

      ha-card {
        cursor: default;
        display: flex;
        background: transparent;
        overflow: visible;
        padding: 0px;
        position: relative;
        color: inherit;
        font-size: calc(var(--duravit-toilet-unit) * 0.35);
        --mdc-icon-button-size: calc(var(--duravit-toilet-unit));
        --mdc-icon-size: calc(var(--duravit-toilet-unit) * 0.6);
      }
      
      .duravit-toilet {
        align-self: flex-end;
        box-sizing: border-box;
        position: relative;
        padding: 16px;
        transition: padding .25s ease-out;
        width: 100%;
        will-change: padding;
      }
      
      .flex {
        display: flex;
        display: -ms-flexbox;
        display: -webkit-flex;
        flex-direction: row;
      }
      
      .entity__icon {
        color: var(--duravit-toilet-icon-color);
        animation: fade-in .25s ease-out;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 100%;
        height: var(--duravit-toilet-unit);
        width: var(--duravit-toilet-unit);
        min-width: var(--duravit-toilet-unit);
        line-height: var(--duravit-toilet-unit);
        position: relative;
        text-align: center;
        will-change: border-color;
        transition: border-color .25s ease-out;
      }
      .entity__icon[color] {
        color: var(--duravit-toilet-icon-active-color);
      }
      
      .entity__info {
        justify-content: center;
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        position: relative;
        overflow: hidden;
        user-select: none;
        flex: 1 0 60px;
      }

      .entity__info__name {
        line-height: calc(var(--duravit-toilet-unit) / 2);
        color: var(--duravit-toilet-text-color);
        font-weight: var(--duravit-toilet-name-font-weight);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .duravit-toilet__state{
        line-height: initial;
        justify-content: center;
        align-items: center;
        text-align: justify;
        display: flex;
      }

      .duravit-toilet__function{
        justify-content: center;
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        margin-right: 16px;
        position: relative;
        overflow: hidden;
        user-select: none;
      }

      .duravit-toilet__left{
        margin-left: inherit;
        display: flex;
        justify-content: flex-start;
      }

      .duravit-toilet__right{
        margin-left: auto;
        display: flex;
        justify-content: flex-end;
      }

      .bar{
        width: calc(var(--duravit-toilet-unit) * 0.75);
        height: 35%;
        margin-right: 1px;
        position: relative;
        top: 50%;
        margin-top: calc(var(--duravit-toilet-unit) * -0.18);
      }

      .active_bar{
        background-color:var(--duravit-toilet-icon-color);
      }

      .inactive_bar{
        background-color:var(--disabled-text-color);
      }

      .inactive_icon{
        color:var(--disabled-text-color);
      }

      @keyframes slide {
        100% { transform: translateX(-100%); }
      }
      @keyframes move {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
  }
}

function deepCopy(value) {
  if (!(!!value && typeof value == 'object')) {
    return value;
  }
  if (Object.prototype.toString.call(value) == '[object Date]') {
    return new Date(value.getTime());
  }
  if (Array.isArray(value)) {
    return value.map(deepCopy);
  }
  var result = {};
  Object.keys(value).forEach(
    function(key) { result[key] = deepCopy(value[key]); });
  return result;
}

customElements.define("duravit-toilet", DuravitToilet);