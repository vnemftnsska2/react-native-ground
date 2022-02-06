import React, { useState } from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { images } from './images';
import { theme } from './theme';

//Components
import IconButton from './components/IconButton';
import Input from './components/Input';
import Task from './components/Task';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const App = () => {
  const width = useWindowDimensions().width;
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({
    1: { id: '1', text: 'Habbit', completed: false },
    2: { id: '2', text: 'React Native', completed: true },
    3: { id: '3', text: 'React Native Sample', completed: false },
    4: { id: '4', text: 'Edit Todo Item', completed: false },
  });

  //Event
  const _addTask = () => {
    const _ID = Date.now().toString();
    const newTaskObject = {
      [_ID]: { id: _ID, text: newTask, completed: false },
    };
    setNewTask('');
    setTasks({ ...tasks, ...newTaskObject });
  };
  const _handleTextChange = text => {
    setNewTask(text);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>TODO List</Title>
        <Input
          placeholder="+ Add a Task"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task key={item.id} text={item.text} />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};

export default App;
