package com.portfolio.taskmanager.service;

import com.portfolio.taskmanager.model.Task;
import com.portfolio.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    public List<Task> findAll() {
        return repository.findAll();
    }

    public Optional<Task> findById(Long id) {
        return repository.findById(id);
    }

    public Task save(Task task) {
        return repository.save(task);
    }

    public Task update(Long id, Task taskDetails) {
        Task task = repository.findById(id).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        return repository.save(task);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
