import type { JSX } from "react";
import { useState, useEffect } from "react";

interface Employee {
  id: string;
  name: string;
  age: number;
  email: string;
}

interface EmployeesApiResponse {
  employees: Employee[];
  total: number;
  page: number;
}

function TheUserTableThatShowsNothing(): JSX.Element {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployees = async (): Promise<void> => {
      try {
        const res = await fetch("/api/employees");
        if (!res.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = (await res.json()) as EmployeesApiResponse;
        setEmployees(data.employees);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Each state replaces the other — early returns
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (employees.length === 0) return <div>No employees found.</div>;

  // Only reaches here when data is ready
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee: Employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.age}</td>
            <td>{employee.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TheUserTableThatShowsNothing;
