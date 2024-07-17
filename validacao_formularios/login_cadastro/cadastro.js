const validarCadastro = (email, senha, confirmarSenha, cpf)=>{

    const emailRegex = `/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/`;
    const senhaRegex = `/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/`;
    const cpfRegex = `/^\d{3}\.\d{3}\.\d{3}-\d{2}$/`;
    const erro = []

    if(!emailRegex.test(email)){
        erro.push('Email inválido.');
        return false;
    }
    if(!senhaRegex.test(senha)){
        erro.push('A senha deve conter pelo menos 6 caracteres, incluindo pelo menos um numero.');
        return false;
    };
    if(senha !== confirmarSenha){
        erro.push('As senhas precisam ser iguais.');
        return false;
    };  
    if(!cpfRegex.test(cpf)){
        erro.push('Formato inválido');
        return false;
    };
    
    console.log('Campos de formulário válidos.');
    return true;
};

const botaoCadastrar = ()=>{

}

validarCadastro('teste@exemplo.com', 'senha123', '123.456.789-01')