import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, BriefcaseIcon, DollarSignIcon } from 'lucide-react';

const Index = () => {
  const [totalMensual, setTotalMensual] = useState(0);
  const [consumido, setConsumido] = useState(0);
  const [diasRestantes, setDiasRestantes] = useState(0);
  const [diasHabilesRestantes, setDiasHabilesRestantes] = useState(0);

  useEffect(() => {
    const hoy = new Date();
    const finDeMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    const diasRestantes = finDeMes.getDate() - hoy.getDate() + 1;
    setDiasRestantes(diasRestantes);

    const diasHabiles = Math.floor(diasRestantes * (5 / 7));
    setDiasHabilesRestantes(diasHabiles);
  }, []);

  const calcularPresupuestoDiario = () => {
    if (diasRestantes === 0) return 0;
    return (totalMensual - consumido) / diasRestantes;
  };

  const calcularPresupuestoDiarioHabil = () => {
    if (diasHabilesRestantes === 0) return 0;
    return (totalMensual - consumido) / diasHabilesRestantes;
  };

  const calcularRemanente = () => {
    return totalMensual - consumido;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <Card className="w-[380px] bg-gray-800 border-cyan-500 shadow-lg shadow-cyan-500/50">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Calculadora de Presupuesto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="total-mensual" className="text-cyan-300">Total mensual:</Label>
              <Input
                id="total-mensual"
                type="number"
                value={totalMensual}
                onChange={(e) => setTotalMensual(Number(e.target.value))}
                placeholder="0"
                className="bg-gray-700 border-cyan-500 text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consumido" className="text-cyan-300">Consumido hasta ahora:</Label>
              <Input
                id="consumido"
                type="number"
                value={consumido}
                onChange={(e) => setConsumido(Number(e.target.value))}
                placeholder="0"
                className="bg-gray-700 border-cyan-500 text-white placeholder-gray-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-cyan-100">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-cyan-400" />
                <span>Días restantes: {diasRestantes}</span>
              </div>
              <div className="flex items-center">
                <BriefcaseIcon className="h-5 w-5 mr-2 text-cyan-400" />
                <span>Días hábiles: {diasHabilesRestantes}</span>
              </div>
              <div className="flex items-center">
                <DollarSignIcon className="h-5 w-5 mr-2 text-cyan-400" />
                <span>Diario: ${calcularPresupuestoDiario().toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <DollarSignIcon className="h-5 w-5 mr-2 text-cyan-400" />
                <span>Diario hábil: ${calcularPresupuestoDiarioHabil().toFixed(2)}</span>
              </div>
              <div className="flex items-center col-span-2">
                <DollarSignIcon className="h-5 w-5 mr-2 text-cyan-400" />
                <span className="text-lg font-bold text-blue-300">Remanente: ${calcularRemanente().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;