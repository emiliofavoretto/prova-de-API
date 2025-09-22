import dados from "../models/dados.js";
const { cars } = dados;

const getAllCars = (req, res) => {
    let resultado = cars;

    // FILTROS AQUI (se quiser implementar)

    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
}

const getCarById = (req, res) => {
    const id = parseInt(req.params.id);
    const car = cars.find(c => c.id === id);

    if (!car) {
        return res.status(404).json({
            success: false,
            message: `Carro não encontrado, id: ${id}`
        });
    }

    res.status(200).json({
        total: 1,
        data: car
    });
}

const createCar = (req, res) => {
    const { nome, ano, tipo, cor, modelo } = req.body;

    const tiposCarros = ["Esportivo", "Sedan", "Pickup", "Sedan Elétrico", "SUV", "Hatchback"];

    if (!nome) {
        return res.status(400).json({
            success: false,
            message: "O campo 'nome' é obrigatório"
        });
    }

    if (!ano) {
        return res.status(400).json({
            success: false,
            message: "O campo 'ano' é obrigatório"
        });
    }

    if (!tipo) {
        return res.status(400).json({
            success: false,
            message: "O campo 'tipo' é obrigatório"
        });
    }

    if (!cor) {
        return res.status(400).json({
            success: false,
            message: "O campo 'cor' é obrigatório"
        });
    }

    if (!modelo) {
        return res.status(400).json({
            success: false,
            message: "O campo 'modelo' é obrigatório"
        });
    }

    // Regras de negócio
    if (ano < 1886) {  // Primeiro carro do mundo foi inventado em 1886
        return res.status(400).json({
            success: false,
            message: "O ano deve ser maior ou igual a 1886"
        });
    }

    if (!tiposCarros.includes(tipo)) {
        return res.status(400).json({
            success: false,
            message: `O tipo "${tipo}" não é válido. Tipos permitidos: ${tiposCarros.join(", ")}.`
        });
    }

    // como criar um novo0 carro 
    const novoCar = {
        id: cars.length + 1,
        nome,
        ano,
        tipo,
        cor,
        modelo
    };

    cars.push(novoCar);

    res.status(201).json({
        success: true,
        message: "Novo carro cadastrado com sucesso",
        data: novoCar
    });
}

const deleteCar = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const idParaApagar = parseInt(id);

    const carParaRemover = cars.find(c => c.id === idParaApagar);

    if (!carParaRemover) {
        return res.status(404).json({
            success: false,
            message: "Carro com esse id não existe"
        });
    }

    const carrosFiltrados = cars.filter(c => c.id !== idParaApagar);

    cars.splice(0, cars.length, ...carrosFiltrados);

    return res.status(200).json({
        success: true,
        message: "O carro foi removido com sucesso!"
    });
}

const updateCar = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, ano, tipo, cor, modelo } = req.body;

    const tiposCarros = ["Esportivo", "Sedan", "Pickup", "Sedan Elétrico", "SUV", "Hatchback"];

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const carExiste = cars.find(c => c.id === id);

    if (!carExiste) {
        return res.status(404).json({
            success: false,
            message: "Carro não existe"
        });
    }

    // Regras de negócio
    if (ano && ano < 1886) {
        return res.status(400).json({
            success: false,
            message: "O ano deve ser maior ou igual a 1886"
        });
    }

    if (tipo) {
        if (!tiposCarros.includes(tipo)) {
            return res.status(400).json({
                success: false,
                message: `O tipo "${tipo}" não é válido. Tipos permitidos: ${tiposCarros.join(", ")}.`
            });
        }
    }

    const carrosAtualizados = cars.map(car =>
        car.id === id
            ? {
                ...car,
                ...(nome && { nome }),
                ...(ano && { ano }),
                ...(tipo && { tipo }),
                ...(cor && { cor }),
                ...(modelo && { modelo })
            }
            : car
    );

    cars.splice(0, cars.length, ...carrosAtualizados);

    const carroAtualizado = cars.find(c => c.id === id);

    res.status(200).json({
        success: true,
        message: "Carro atualizado com sucesso",
        data: carroAtualizado
    });
}

export { getAllCars, getCarById, createCar, deleteCar, updateCar };
