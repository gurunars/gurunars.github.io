import * as React from "react";

import { Url } from "../Link";
import { Item, durationToString } from "./interface";

const ItemView = ({ item }: {item: Item}): React.ReactElement<any> => (
  <div 
    style={{
      margin: 5, 
      padding: 10
    }}
  >
    <h3>{item.title}</h3>
    {item.location && (
      <p style={{fontSize: 14}}>
        <b style={{color: "grey"}}>[at]:</b> 
        <Url link={item.location} />
      </p>
    )}
    <p style={{fontSize: 13}}>
      <i>{item.type} | {durationToString(item.duration)} </i>
    </p>

    <div 
      style={{
        marginLeft: 5,
        marginTop: 6,
        paddingLeft: 10,
        borderLeft: "3px solid grey",
        paddingBottom: 10
      }}
    >

        {item.description && (
          <div>
              <h4>Description</h4>

              <div style={{marginTop: 10}}>
                  {item.description}
              </div>
          </div>
        )}
        {item.achievements && (
          <div>
              <h4 
                style={{
                  paddingTop: 10,
                  paddingBottom: 10
                }}
              >
                Achievements
              </h4>
              <ul 
                style={{
                  paddingLeft: 20
                }}
              >
                {item.achievements.map(value => <li key={value}>{value}</li>)}
              </ul>
          </div>
        )}
        {item.references && (
          <div>
            <h4 
              style={{
                paddingTop: 10,
                paddingBottom: 10
              }}
            >
              References
            </h4>
            <ul 
              style={{
                paddingLeft: 20
              }}
            >
              {item.references.map(reference => (
                <li key={reference.name}><Url link={reference} /></li>
              ))}
            </ul>
          </div>
        )}
        <div 
          style={{
            marginTop: 10
          }}
        >
          {item.tags.map(tag => (
            <i
              key={tag}
              style={{
                backgroundColor: "Beige",
                display: "inline-block",
                textDecoration: "none",
                whiteSpace: "pre",
                color: "Black",
                marginLift: 5,
                marginRight: 5,
                paddingTop: 3,
                paddingBottom: 3,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 12,
                borderRadius: 5
              }}
            >
            {tag}
            </i>
          ))}
        </div>

    </div>

    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 5
      }}
    >
      {item.links.map(link => (
        <Url link={link} style={{marginBottom: 4}} />
      ))}
    </div>
  </div>
);

export default ItemView;