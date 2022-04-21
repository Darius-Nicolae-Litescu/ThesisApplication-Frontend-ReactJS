import React from "react";
import {
  ListGroup,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";

import "./sidebar.css";

export const SelectCategories = (props) => {
  const {
    sectionSelected: sectionSelected,
    setSectionSelected: setSectionSelected,
    selectedCategory: selectedCategory,
    setSelectedCategory: setSelectedCategory,
    selectedOperation: selectedOperation,
    setSelectedOperation: setSelectedOperation,
    optionsData: optionsData,
  } = props;

  const handleClick = (category, operation) => {
    setSelectedCategory(category);
    setSelectedOperation(operation);
  };

  const displayTable = () => {
    let switchSectionSelected = !sectionSelected;
    setSectionSelected(switchSectionSelected);
  };

  return (
    <nav className="d-none d-md-block col-sm-2 col-md-2 col-lg-2 col-xl-2 sidebar">
      <div className="sidebar">
        <ListGroup style={{ marginTop: "50%", borderRadius: "20px" }}>
          <ListGroup.Item
            style={{
              display: "grid",
              textAlign: "right",
              justifyItems: "end",
              textAlignLast: "end",
            }}
          >
            {optionsData.map((item) => {
              return (
                <DropdownButton
                  variant="primary"
                  className="button-colors"
                  style={{
                    marginLeft: "10%",
                    width: "100%",
                    backgroundColor: "white",
                    color: "black",
                  }}
                  as={ButtonGroup}
                  key={item.value}
                  id={`dropdown-variants-${item.value}`}
                  title={item.value}
                  drop="end"
                >
                  {item.options.map((itemOptions) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          handleClick(item.key, itemOptions.key);
                          displayTable();
                        }}
                        key={itemOptions.value}
                      >
                        {itemOptions.value + ` "${item.value}" Data`}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              );
            })}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </nav>
  );
};
