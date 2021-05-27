import React from "react";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Media,
} from "reactstrap";

export const Feed = ({ items }) => (
  <Card className="flex-fill w-100">
    <CardHeader>
      {/* <Badge color="info" className="float-right">
        Today
      </Badge> */}
      <CardTitle tag="h5" className="mb-0">
        Daily feed
      </CardTitle>
    </CardHeader>
    <CardBody>
      {items.map((item) => (
        <div>
          <Media>
            <Media body>
              {/* <small className="float-right text-navy">5m ago</small> */}
              <strong>{item.Title}:</strong> {item.Content}
              <br />
              <small className="text-muted">{item["Post Date"]}</small>
              <br />
            </Media>
          </Media>
          <hr />
        </div>
      ))}
    </CardBody>
  </Card>
);
