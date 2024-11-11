import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Button, Container, Table } from 'react-bootstrap';

function Segmentpage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [segments, setSegments] = useState([]);

  const handleSaveSegment = (newSegment) => {
    setSegments([...segments, newSegment]);
    setShowSidebar(false);
  };

  console.log("data:",segments);

  return (
    <Container className="text-center mt-5">
      <h2>Segment Management</h2>
      <Button
        variant="primary"
        onClick={() => setShowSidebar(!showSidebar)}
        className="my-4"
      >
        Save Segment
      </Button>

      {showSidebar && <Sidebar onSave={handleSaveSegment} onClose={() => setShowSidebar(false)} />}

      <Table bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Segment Name</th>
            <th>Schema</th>
          </tr>
        </thead>
        <tbody>
          {segments.map((segment, index) => (
            <tr key={index}>
              <td>{segment.segment_name}</td>
              <td>
                {segment.schema.map((schema, idx, arr) => {
                  const schemaValue = Object.values(schema)[0];
                  if (idx === arr.length - 1) {
                    return `${schemaValue}`;
                  } else {
                    return `${schemaValue}, `;
                  }
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Segmentpage;
