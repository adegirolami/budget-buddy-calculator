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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
      <Card className="w-[480px] bg-card border-primary/20 shadow-lg shadow-primary/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Calculadora de Presupuesto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="total-mensual" className="text-primary">Total mensual:</Label>
              <Input
                id="total-mensual"
                type="number"
                value={totalMensual}
                onChange={(e) => setTotalMensual(Number(e.target.value))}
                placeholder="0"
                className="bg-muted border-primary/30 text-foreground placeholder-muted-foreground focus:border-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consumido" className="text-primary">Consumido hasta ahora:</Label>
              <Input
                id="consumido"
                type="number"
                value={consumido}
                onChange={(e) => setConsumido(Number(e.target.value))}
                placeholder="0"
                className="bg-muted border-primary/30 text-foreground placeholder-muted-foreground focus:border-secondary"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-secondary" />
              <span className="text-foreground">Días restantes: {diasRestantes}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BriefcaseIcon className="h-5 w-5 text-secondary" />
              <span className="text-foreground">Días hábiles: {diasHabilesRestantes}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSignIcon className="h-5 w-5 text-secondary" />
              <span className="text-foreground">Diario: ${calcularPresupuestoDiario().toFixed(2)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSignIcon className="h-5 w-5 text-secondary" />
              <span className="text-foreground">Diario hábil: ${calcularPresupuestoDiarioHabil().toFixed(2)}</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3 pt-4 border-t border-primary/20">
            <DollarSignIcon className="h-6 w-6 text-accent" />
            <span className="text-2xl font-bold text-accent">Remanente: ${calcularRemanente().toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;