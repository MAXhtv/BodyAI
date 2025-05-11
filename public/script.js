// funcao sigmoid, para tranaformar um valor numerico em ou 1 ou 0
function sign(sum) {
  return sum>=0 ? 1 : -1
}

//funcao derivada de sigmoid para ajustar os pesos na hora de treinamento
function signD(sum) {
  return sum*(1-sum)
}

class Perceptron {
  weights=[0,0]
  constructor(inputCount){
    this.weights=Array(inputCount).fill(0).map(()=>
    Math.random()*2-1)
    this.bias=Math.random()
    this.learningRate=0.1
  }
  guess(inputs) {
    let sum=0
    sum=inputs.reduce((sum, input, i)=>
    sum+input*this.weights[i], this.bias)
    return sign(sum)
  }
  train(inputs, expectedOutput) {
    const output=this.guess(inputs)
    const error=expectedOutput-output
    
    this.weights=this.weights.map((weight, i)=>
    weight+error*inputs[i]*this.learningRate)
    this.bias+=error*this.learningRate
  }
}

const perceptron= new Perceptron(3)

const trainData=[
  [[18.5, 0.3, 0], 0],
  [[24.0, 0.6, 1], 1],
  [[29.0, 0.9, 0], 0],
  [[35.0, 0.9, 1], 1],
  ]
for (let epoch=0; epoch<10000; epoch++) {
  trainData.forEach(([inputs, output])=>
  perceptron.train(inputs, output))
}

const peso=parseFloat(prompt("diga seu peso (kg): "))
const altura=parseFloat(prompt("diga sua altura (m): "))
const imc=peso/(altura*altura)
const biotipo=prompt("qual seu biotipo? (ectomorfo, endomorfo, mesomorfo): ").toLowerCase().trim()
const biotipoMap={ectomorfo: 0.3, mesomorfo: 0.6, endomorfo:0.9}
const objetivo=prompt("qual seu objetivo? (hipertrofia ou definicao): ").toLowerCase().trim()
const objetivoMap={hipertrofia: 0, definicao: 1}
const inputs=[imc, biotipoMap[biotipo], objetivoMap[objetivo]]
const prediction=perceptron.guess(inputs)
console.log(prediction)

r=[]
const rotine={
  "treino pesado":{"academia":"-Peito e Triceps: Supino reto com barra(progressão de carga pesada) 4x8-12. Crucifixo com halteres(amplitude total) 4x8-12. Triceps testa com barra 4x8-10. -Costas e Biceps: Barra fixa com peso aricional 4x6-8. Remada curvada com baera 4x8-12. Rosca direta com barra(carga alta) 4x8-10. -Pernas e Gluteos: Agachamento livre com barra 4x6-10. Leg Press com carga elevada: 4x8-12. Stiff com halteres pesados: 4x8-10. -Ombros e Abdomen: Desenvolvimento com halteres (carga pesada) 4x6-10. Encolhimento de ombros com barra 4x8-10. Prancha com peso adicional 3x30-45 segundos.",
  "calistenia":"-Peito e Triceps:Flexões com carga (mochila pesada)4x8-12. Dips em paralelas (com peso extra): 4x6-10. Flexões inclinadas (pés elevados): 4x8-12. -Costas e Biceps: Pull-Ups com carga (mochila ou corrente): 4x6-8. Remada invertida (pés elevados): 4x8-10. Chin-Ups (peso adicional): 4x6-8. -Pernas e Gluteos: Agachamento com mochila pesada: 4x8-12. Pistol Squat (com carga extra): 4x6-8. Afundo com carga nas costas: 4x8-10. -Ombros e abdomen: Handstand Push-Ups (com amplitude total): 4x6-8. Pike Push-Ups (com mochila pesada): 4x8-10. Hollow Body Hold com carga extra: 4x20-30 segundos."},
  "treino leve":{
    "academia":"-Peito e Triceps: Supino reto com halteres: 4x15-20. Crucifixo no cabo ou com halteres: 4x15-20. Tríceps Pulley: 4x15-20. -Costas e biceps: Barra fixa pronada (peso corporal): 4x10-12. Pulldown na máquina: 4x15-20. Rosca direta com halteres (movimento lento): 4x15-20. -Pernas e gluteos: Agachamento livre (carga leve): 4x15-20. Afundo com halteres: 4x12-15 cada perna. Extensão de pernas na máquina: 4x15-20. -Ombros e Abdomen: Elevação lateral com halteres: 4x15-20. Prancha abdominal (peso leve): 4x1 min. Abdominal com corda no pulley: 3x15-20.",
    "calistenia":"-Peito e Triceps: Flexões de braço tradicionais: 4x20-25. Dips em paralelas (peso corporal): 4x12-15. Flexões com batida de palma (explosivas): 3x12-15. -Costas e biceps: Australian Pull-Up (remada invertida): 4x12-15. Chin-Up (pegada supinada): 4x10-12. Superman no chão (foco em lombar): 4x20. -Pernas e gluteos: Agachamentos livres (profundos): 4x20-25. Afundo (lunges) com peso corporal: 4x15 cada perna. Pistol Squat (assistido): 4x8-10 cada perna. -Ombros e abdomen: Pike Push-Ups: 4x12-15. Prancha abdominal isométrica: 4x1 min. V-Ups: 4x15-20."}
}
const typeTreino=prompt("Voce quer treinar com calistenia ou academia?: ").toLowerCase().trim()
const biotipoAjuste={"ectomorfo": "frequencia: 3-4 vezes por semana. Com treinos de força mais pesados e menos repetição e periodos de descanso mais longos entre os treinos.","mesomorfo": "frequencia: 4-5 vezes por semana. combinação equilibrada de treinos de força e hipertrofia, e descanso moderado.","endomorfo": "frequencia: 5-6 vezes por semana. Treinos de alta intensidade com mais repeticoes e menos peso e descanso mais curto entre os treinos.",}

const treino=prediction < 0.5 ? "treino pesado" : "treino leve"
rotinaF=rotine[treino][typeTreino]
body=biotipoAjuste[biotipo]
r.push(rotinaF, body)
console.log(r)

//se for apagar, apaga isso
let rotinaAI
function json(r){
  localStorage.setItem('rotina', r)
  alert('sua rotina foi salva!')
  let rotinaAI=localStorage.getItem('rotina')
}


document.getElementById("rotina").innerHTML=r.join(" | ")