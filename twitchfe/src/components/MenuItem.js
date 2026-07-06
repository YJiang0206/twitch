import { Menu } from "antd";
import React from "react";

// map can take the list and work on each element in the callback function, and return a list
function MenuItem({ items }) {
  return items?.map((item) => (
    <Menu.Item key={item.id}>
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        {`${item.broadcaster_name} - ${item.title}`}
      </a>
    </Menu.Item>
  ));
}

export default MenuItem;
