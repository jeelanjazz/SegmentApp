import React, { useState } from 'react';
import { Form, Button, Dropdown, Row, Col } from 'react-bootstrap';
import './Sidebar.css';

function Sidebar({ onSave, onClose }) {
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]); 
  const [availableOptions, setAvailableOptions] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ]);

  const handleAddSchema = (selectedOption) => {
    setSchemas([...schemas, selectedOption]);
    setAvailableOptions(availableOptions.filter(opt => opt.value !== selectedOption.value));
  };

  const handleChangeSchema = (index, newOption) => {
    const updatedSchemas = schemas.map((schema, i) =>
      i === index ? newOption : schema
    );
    setSchemas(updatedSchemas);
    setAvailableOptions([
      ...availableOptions.filter(option => option.value !== newOption.value),
      schemas[index]
    ]);
  };

  const handleRemoveSchema = (index) => {
    const removedSchema = schemas[index];
    setSchemas(schemas.filter((_, i) => i !== index));
    setAvailableOptions([...availableOptions, removedSchema]);
  };

  const handleSubmit = () => {
    if (segmentName && schemas.length > 0) {
      const formattedData = {
        segment_name: segmentName,
        schema: schemas.map(schema => ({ [schema.value]: schema.label }))
      };

      onSave(formattedData); 
      onClose(); 
    } else {
      alert("Please provide a segment name and at least one schema.");
    }
  };
  
  

  const isSubmitDisabled = !segmentName || schemas.length === 0;

  console.log("scheme:",schemas);
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className='d-flex align-items-center justify-content-between mb-3'>
          <h5 className='sidebar-title mb-0'>Saving Segment</h5>
          <button type="button" className="close-button" onClick={onClose}>×</button>
        </div>

        <div>
          <label htmlFor="name" className="form-label">Enter the Name of the Segment</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            required
          />
        </div>

        <p className="text-muted m-2">To save your segment, you need to add the schemas to build the query</p>

        <div className="schema-box">
          {schemas && schemas.length > 0 && schemas.map((schema, index) => (
            <Row key={index} className="mb-2 align-items-center">
              <Col xs="auto" className="dot">
                <span className="dot-color user-trait"></span>
              </Col>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" className="schema-dropdown">
                    {schema.label}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {availableOptions.map((option) => (
                      <Dropdown.Item key={option.value} onClick={() => handleChangeSchema(index, option)}>
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col xs="auto">
                <Button variant="outline-danger" onClick={() => handleRemoveSchema(index)} className="remove-button">
                  ×
                </Button>
              </Col>
            </Row>
          ))}
        </div>

        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" className="schema-dropdown">
            Add schema to segment
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {availableOptions.map((option) => (
              <Dropdown.Item key={option.value} onClick={() => handleAddSchema(option)}>
                {option.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <p className="add-schema-link" onClick={() => availableOptions.length > 0 && handleAddSchema(availableOptions[0])}>
          + Add new schema
        </p>

        <div className="button-group">
          <Button
            variant="success"
            onClick={handleSubmit}
            className="save-button"
            disabled={isSubmitDisabled}
          >
            Save the Segment
          </Button>
          <Button variant="outline-danger" onClick={onClose} className="cancel-button">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
