import { useEffect, useState } from "react";
import { ICategoria } from "../../interfaces/ICategoria";
import CardLivro from "../CardLivro";
import "./ListaLivros.css";
import { AbCampoTexto } from "ds-alurabooks";
import { useLivros } from "../../graphql/livros/hooks";
import { useReactiveVar } from "@apollo/client";
import { filtroDeLivrosVar, livrosVar } from "../../graphql/livros/state";

interface ListaLivrosProps {
  categoria: ICategoria;
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const [busca, setBusca] = useState("");

  useEffect(() => {
    filtroDeLivrosVar({
      ...filtroDeLivrosVar(),
      titulo: busca.length >= 3 ? busca : "",
    });
  }, [busca]);

  useEffect(() => {
    filtroDeLivrosVar({
      ...filtroDeLivrosVar(),
      categoria,
    });
  }, [categoria]);

  const livros = useReactiveVar(livrosVar);
  useLivros();

  return (
    <section>
      <form style={{ maxWidth: "80%", margin: "0 auto", textAlign: "center" }}>
        <AbCampoTexto
          value={busca}
          onChange={setBusca}
          placeholder="Digite o título do livro"
        />
      </form>
      <div className="livros">
        {livros.map((livro) => (
          <CardLivro livro={livro} key={livro.id} />
        ))}
      </div>
    </section>
  );
};

export default ListaLivros;
