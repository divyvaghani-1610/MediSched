import AppointmentForm from '../components/AppointmentForm';
import AppointmentList from '../components/AppointmentList';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Patient Dashboard</h1>
      <AppointmentForm />
      <AppointmentList isAdmin={false} />
    </div>
  );
}