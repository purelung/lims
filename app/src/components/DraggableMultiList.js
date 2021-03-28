import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
`;

const StyledLeft = styled.div`
  background-color: white;
`;

const StyledRight = styled.div`
  background-color: white;
`;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: "5px 10px",
  color: "white",
  borderRadius: ".5rem",
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  width: 350,
  borderRadius: ".5rem",
});

export const DraggableMultiList = ({ listState, setListState }) => {
  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  const id2List = {
    droppable: "items",
    droppable2: "selected",
  };

  const getList = (id) => listState[id2List[id]];

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      //seems to be a bug with reorder, skipping for now
      //return;

      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      const state =
        source.droppableId === "droppable" ? { items } : { selected: items };

      setListState({ ...listState, ...state });
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setListState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledContainer>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <StyledLeft
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <h6>Available</h6>
              {listState.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </StyledLeft>
          )}
        </Droppable>
        <Droppable droppableId="droppable2">
          {(provided, snapshot) => (
            <StyledRight
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <h6>Selected</h6>
              {listState.selected.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </StyledRight>
          )}
        </Droppable>
      </StyledContainer>
    </DragDropContext>
  );
};
