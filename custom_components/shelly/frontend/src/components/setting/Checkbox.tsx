import React, { Component } from "react";
import { Instance, Setting } from "../../data";
import { SendWebSocketAction } from "../../util";

interface Props {
  instance: Instance,
  setting: Setting,
  param: string
}

export default class ShellySettingCheckbox extends Component<Props> {
  public constructor(props) {
    super(props)
    this.update_setting=this.update_setting.bind(this)
  }

  public update_setting(e) {
    let checked = e?.target.checked;
    const { setting, param, instance } = this.props;
    SendWebSocketAction(instance.hass, "s4h/setting", 
    {
      id : setting.id,
      instanceid : instance.instance_id,
      param : param,
      value : checked
    });
  }

  render() {
    const { setting, param } = this.props;
    return <div className={param}>
        {setting.has[param] ? 
        <>
          {param}:&nbsp;
          <input type="checkbox" title={setting.name}
            checked={setting.value[param]} 
            onChange={this.update_setting} />
        </>
        : ""}
        
      </div>
  }
}