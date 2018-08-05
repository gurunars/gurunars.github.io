import * as React from "react";

import { FullUrl, Url } from "../Link";
import { durationToString, Item } from "./interface";
import Tag from "./Tag";

const Section = (props: {
  title: string,
  data: any
}) => (
    <div>
      <h4
        style={{
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        {props.title}
      </h4>
      <div>
        {props.data}
      </div>
    </div>
  );

const ItemView = ({ item }: { item: Item }): React.ReactElement<any> => (
  <div
    style={{
      padding: 10,
      position: "relative"
    }}
  >
    <h3 style={{ marginBottom: 5 }}>{item.title}</h3>
    {item.location && (
      <p style={{ fontSize: 14 }}>
        <b style={{ color: "grey" }}>[at]:</b>
        <Url link={item.location} />
      </p>
    )}
    <p style={{ fontSize: 13 }}>
      <i>{item.type} | {durationToString(item.duration)} </i>
    </p>

    <div
      style={{
        marginLeft: 5,
        marginTop: 8,
        paddingLeft: 10,
        borderLeft: "3px solid grey",
        paddingBottom: 10
      }}
    >
      {item.description && (
        <Section
          title="Description"
          data={item.description}
        />)
      }
      {item.achievements && (
        <Section
          title="Achievements"
          data={item.achievements.map(value => <li key={value}>{value}</li>)}
        />)
      }
      {item.achievements && (
        <Section
          title="References"
          data={item.references.map(reference => (
            <li key={reference.name}><Url link={reference} /></li>
          ))}
        />)
      }
      <div style={{ marginTop: 10 }}>
        {item.tags.map(tag => (<Tag key={tag}>{tag}</Tag>))}
      </div>
    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 10
      }}
    >
      {item.links.map(link => (
        <FullUrl key={link.name} link={link} style={{ marginBottom: 4 }} />
      ))}
    </div>
  </div>
);

export default ItemView;