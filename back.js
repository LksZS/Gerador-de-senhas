// Funcão para medir força
function avaliarForca(senha) {
  let forca = 0;
  // +1 de força para minusculas
  if (senha.length >= 8) forca++;
  // +1 de força para maiusculas
  if (/[A-Z]/.test(senha)) forca++;
  // +1 de força para numeros
  if (/[0-9]/.test(senha)) forca++;
  // +1 de força para simbolos
  if (/[^A-Za-z0-9]/.test(senha)) forca++;
  
  // Se a senha for menor ou igual à 1 (ponto de força),  ela é fraca
  if (forca <= 1) return {texto: "Fraca 🔴", cor: "red"};
  // Se a senha for menor ou igual à 2 (ponto de força),  ela é média
  if (forca == 2) return {texto: "Média 🟡", cor: "yellow"};
  // Se a senha não for fraca ou média, retornar forte
  return {texto: "Forte 🟢", cor: "lightgreen"};
}

// Função do botão para gerar senhas
function gerarSenha() {
  // Procurar elemento pelo id do item
  const tamanho = document.getElementById("tamanho").value;
  const incluirMaiusculas = document.getElementById("maiusculas").checked;
  const incluirNumeros = document.getElementById("numeros").checked;
  const incluirSimbolos = document.getElementById("simbolos").checked;

  // caracteres válidos para senha e atribuição de numeros e simbolos
  let caracteres = "abcdefghijklmnopqrstuvwxyz";
  if (incluirMaiusculas) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (incluirNumeros) caracteres += "0123456789";
  if (incluirSimbolos) caracteres += "!@#$%^&*()_-+={}[]|:;<>,.?/";
  
  // senha inicialmente null
  let senha = "";
  // rep básico
  for (let i = 0; i < tamanho; i++) {
    // gera a senha aleatoriamente, arredondando os numeros e atribuindo caracteres
    senha += caracteres[Math.floor(Math.random() * caracteres.length)];
  }

  // mostra o resultado da senha
  document.getElementById("resultado").textContent = senha;

  
  const analise = avaliarForca(senha);
  const forcaEl = document.getElementById("forca");
  forcaEl.textContent = "Força: " + analise.texto;
  forcaEl.style.color = analise.cor;

  adicionarAoHistorico(senha);
}

function adicionarAoHistorico(senha) {
  const hist = document.getElementById("historico");
  const li = document.createElement("li");
  li.textContent = senha;
  hist.prepend(li);
}

document.getElementById("gerar").addEventListener("click", gerarSenha);

// Clicar copia
document.getElementById("resultado").addEventListener("click", function() {
  const texto = this.textContent;
  navigator.clipboard.writeText(texto);
  alert(`Senha copiada! ✔`);
});
