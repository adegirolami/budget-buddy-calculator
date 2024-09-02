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
    // Calcular días restantes y días hábiles restantes
    const hoy = new Date();
    const finDeMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    const diasRestantes = finDeMes.getDate() - hoy.getDate() + 1;
    setDiasRestantes(diasRestantes);

    // Asumimos 5 días hábiles por semana
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Calculadora de Presupuesto Diario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="total-mensual">Total mensual:</Label>
              <Input
                id="total-mensual"
                type="number"
                value={totalMensual}
                onChange={(e) => setTotalMensual(Number(e.target.value))}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consumido">Consumido hasta ahora:</Label>
              <Input
                id="consumido"
                type="number"
                value={consumido}
                onChange={(e) => setConsumido(Number(e.target.value))}
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>Días restantes: {diasRestantes}</span>
              </div>
              <div className="flex items-center">
                <BriefcaseIcon className="h-4 w-4 mr-2" />
                <span>Días hábiles: {diasHabilesRestantes}</span>
              </div>
              <div className="flex items-center">
                <DollarSignIcon className="h-4 w-4 mr-2" />
                <span>Diario: ${calcularPresupuestoDiario().toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <DollarSignIcon className="h-4 w-4 mr-2" />
                <span>Diario hábil: ${calcularPresupuestoDiarioHabil().toFixed(2)}</span>
              </div>
              <div className="flex items-center col-span-2">
                <DollarSignIcon className="h-4 w-4 mr-2" />
                <span>Remanente: ${calcularRemanente().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;