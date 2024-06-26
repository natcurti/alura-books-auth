import { AbBotao } from "ds-alurabooks";
import "./Pedidos.css";
import { useEffect, useState } from "react";
import { useObterToken } from "../../hooks/sessionStorageToken";
import { IPedido } from "../../interfaces/IPedido";
import http from "../../http";
import { formatador } from "../../utils/formatador-moeda";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const token = useObterToken();

  useEffect(() => {
    http
      .get<IPedido[]>("/pedidos")
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const excluirPedido = (id: number) => {
    http
      .delete(`/pedidos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setPedidos(pedidos.filter((pedido) => pedido.id !== id));
      })
      .catch((erro) => console.log(erro));
  };

  return (
    <section className="pedidos">
      <h1>Meus Pedidos</h1>
      {pedidos.map((pedido) => (
        <div className="pedido" key={pedido.id}>
          <ul>
            <li>
              Pedido: <strong>{pedido.id}</strong>
            </li>
            <li>
              Data do pedido:
              <strong>{new Date(pedido.data).toLocaleDateString()}</strong>
            </li>
            <li>
              Valor total: <strong>{formatador.format(pedido.total)}</strong>
            </li>
            <li>
              Entrega realizada em:
              <strong>{new Date(pedido.entrega).toLocaleDateString()}</strong>
            </li>
          </ul>
          <AbBotao texto="Excluir" onClick={() => excluirPedido(pedido.id)} />
          <AbBotao texto="Detalhes" />
        </div>
      ))}
    </section>
  );
};

export default Pedidos;
