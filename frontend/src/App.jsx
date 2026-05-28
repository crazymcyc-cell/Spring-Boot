import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";

// Constantes de Status
const STATUS = {
  PENDENTE: "PENDENTE",
  EM_ANDAMENTO: "EM_ANDAMENTO",
  CONCLUIDA: "CONCLUIDA",
};

// URL do Backend rodando localmente
const API_URL = "https://spring-boot-i9mm.onrender.com";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Buscar tarefas do Banco de Dados (GET)
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Erro na rede");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => {
        console.error("Erro ao buscar tarefas. O backend está rodando?", err);
      });
  }, []);

  // 2. Criar nova tarefa (POST)
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = { title, description, status: STATUS.PENDENTE };
    setLoading(true);

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((createdTask) => {
        setTasks([...tasks, createdTask]);
        setTitle("");
        setDescription("");
      })
      .catch((err) => console.error("Erro ao criar tarefa", err))
      .finally(() => setLoading(false));
  };

  // 3. Atualizar status da tarefa (PUT)
  const handleUpdateStatus = (id, currentStatus) => {
    let newStatus;
    if (currentStatus === STATUS.PENDENTE) newStatus = STATUS.EM_ANDAMENTO;
    else if (currentStatus === STATUS.EM_ANDAMENTO)
      newStatus = STATUS.CONCLUIDA;
    else return;

    const taskToUpdate = tasks.find((t) => t.id === id);

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...taskToUpdate, status: newStatus }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      })
      .catch((err) => console.error("Erro ao atualizar tarefa", err));
  };

  // 4. Deletar tarefa (DELETE)
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== id));
      })
      .catch((err) => console.error("Erro ao deletar tarefa", err));
  };

  // Função auxiliar para renderizar as colunas do Kanban

  const renderColumn = (
    statusLabel,
    statusValue,
    Icon,
    colorClass,
    bgColorClass,
  ) => {
    const columnTasks = tasks.filter((task) => task.status === statusValue);

    return (
      <div
        className={`flex flex-col rounded-xl bg-gray-50/50 border border-gray-200 p-4 min-h-[400px] w-full md:w-1/3`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${colorClass}`} />
            <h2 className="font-semibold text-gray-700">{statusLabel}</h2>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColorClass} ${colorClass}`}
          >
            {columnTasks.length}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {columnTasks.length === 0 ? (
            <div className="text-center p-4 text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
              Nenhuma tarefa nesta etapa
            </div>
          ) : (
            columnTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800 line-clamp-1">
                    {task.title}
                  </h3>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Excluir tarefa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {task.description && (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {task.description}
                  </p>
                )}

                {statusValue !== STATUS.CONCLUIDA && (
                  <button
                    onClick={() => handleUpdateStatus(task.id, statusValue)}
                    className="mt-2 w-full flex items-center justify-center gap-2 text-xs font-medium bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 rounded-md transition-colors"
                  >
                    Avançar <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                {statusValue === STATUS.CONCLUIDA && (
                  <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-500 py-2">
                    <CheckCircle className="w-3 h-3" /> Finalizada
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-100">
      {/* Header */}

      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
            <p className="text-indigo-200 text-xs font-medium">
              Spring Boot + React Portfolio Project
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-600" />
            Nova Tarefa
          </h2>
          <form
            onSubmit={handleCreateTask}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <input
                type="text"
                placeholder="Título da tarefa..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                required
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Descrição (opcional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? "Salvando..." : "Adicionar"}
            </button>
          </form>
        </section>

        {/* Quadro Kanban */}

        <section className="flex flex-col md:flex-row gap-6 items-start">
          {renderColumn(
            "Pendente",
            STATUS.PENDENTE,
            AlertCircle,
            "text-orange-500",
            "bg-orange-100",
          )}
          {renderColumn(
            "Em Andamento",
            STATUS.EM_ANDAMENTO,
            Clock,
            "text-blue-500",
            "bg-blue-100",
          )}
          {renderColumn(
            "Concluída",
            STATUS.CONCLUIDA,
            CheckCircle,
            "text-emerald-500",
            "bg-emerald-100",
          )}
        </section>
      </main>
    </div>
  );
}
