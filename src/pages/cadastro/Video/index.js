import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../Components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../Components/FormField';
import Button from '../../../Components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm({
    titulo: '',
    url: '',
    categoria: 'Ciência',
  });

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        
        /* Testar const
        const categoriaEscolhida = {nome: '',descricao: '',cor: '',}
        categoriaEscolhida = categorias.find((categoria) => {
          if(categoria.titulo === values.categorias){
            
          }
          return 
        });
        */
      
        var categoriaEscolhida = categorias.find((categoria) => {
            return categoria.titulo === values.categoria
        });
        
        if(categoriaEscolhida === undefined){
          categoriaEscolhida = categorias[0];
        }
        
        videosRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhida.id,
        })
        .then(() => {
          console.log('Cadastrou com sucesso!');
          history.push('/');
        });
      }}
      >
        <FormField
          label="Título do Vídeo"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      <br />
      <br />

      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>
    </PageDefault>
  );
}

export default CadastroVideo;