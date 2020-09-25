import React from 'react'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const TabService = () => {
    return (
        <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        >
        {/* <Tab label="Item One" component={Link} to="/one" />
        <Tab label="Item Two" component={Link} to="/two" /> */}
      </Tabs>
    )
}

export default TabService