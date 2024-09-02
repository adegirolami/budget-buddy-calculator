import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, BriefcaseIcon, DollarSignIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

  const calcularPorcentajeGastado = () => {
    if (totalMensual === 0) return 0;
    return (consumido / totalMensual) * 100;
  };

  const datosGrafico = [
    { name: 'Pacing', gastado: calcularPorcentajeGastado(), restante: 100 - calcularPorcentajeGastado() },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900 p-4">
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
          <div className="pt-4 border-t border-primary/20">
            <h3 className="text-lg font-semibold text-center mb-4 text-primary">Pacing de la Campaña</h3>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={datosGrafico} layout="vertical" barSize={30}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value, name) => [`${value.toFixed(2)}%`, name === 'gastado' ? 'Gastado' : 'Restante']}
                />
                <Bar dataKey="gastado" stackId="a" fill="url(#colorGradient)" />
                <Bar dataKey="restante" stackId="a" fill="url(#colorGradientRestante)" />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#db2777" />
                  </linearGradient>
                  <linearGradient id="colorGradientRestante" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#db2777" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center mt-2 text-sm text-muted-foreground">
              Gastado: {calcularPorcentajeGastado().toFixed(2)}% | Restante: {(100 - calcularPorcentajeGastado()).toFixed(2)}%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;