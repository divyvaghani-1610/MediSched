import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function AppointmentList({ isAdmin }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(storedAppointments);

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      setAppointments(updatedAppointments);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleStatusUpdate = (id, status) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status } : appointment
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    toast.success(`Appointment ${status} successfully!`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isAdmin ? 'All Appointments' : 'Your Appointments'}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Doctor</th>
              <th className="p-2 text-left">Date & Time</th>
              <th className="p-2 text-left">Reason</th>
              <th className="p-2 text-left">Status</th>
              {isAdmin && <th className="p-2 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b">
                <td className="p-2">{appointment.name}</td>
                <td className="p-2">
                  <div>{appointment.doctorName}</div>
                  <div className="text-sm text-gray-500">{appointment.doctorSpecialization}</div>
                </td>
                <td className="p-2">
                  <div>{format(new Date(appointment.date), 'PP')}</div>
                  <div className="text-sm text-gray-500">{appointment.time}</div>
                </td>
                <td className="p-2">{appointment.reason}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${
                    appointment.status === 'approved' ? 'bg-green-200' :
                    appointment.status === 'rejected' ? 'bg-red-200' :
                    'bg-yellow-200'
                  }`}>
                    {appointment.status}
                  </span>
                </td>
                {isAdmin && appointment.status === 'pending' && (
                  <td className="p-2">
                    <button
                      onClick={() => handleStatusUpdate(appointment.id, 'approved')}
                      className="mr-2 bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(appointment.id, 'rejected')}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}