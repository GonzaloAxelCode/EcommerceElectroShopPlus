import React, { ElementType, FC, useState } from "react";
import Layout from "../../hocs/Layout";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { activate } from "../../redux/actions/auth";
import { Navigate } from "react-router";

interface Props {
  activate?: Function;
  loading?: boolean;
}
const Activate: FC<Props> = ({ activate, loading }) => {
  const { uid, token } = useParams();
  const [activated, setActivated] = useState<boolean>(false);
  const activateAccount = () => {
    activate && activate(uid, token);
    setActivated(true);
  };

  if (activated && !loading) return <Navigate to="/" />;
  return (
    <Layout>
      <section className="py-24 flex  min-h-screen justify-center bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-[43rem]">
          <div className="text-center">
            <p className="text-lg font-medium leading-8 text-orange-600/95">
              Registro 1 / 2
            </p>
            <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black dark:text-gray-300">
              Active su cuenta
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-slate-400">
              Specify helps you unify your brand identity by collecting, storing
              and distributing design tokens and assets — automatically.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            {loading ? (
              <button
                onClick={activateAccount}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <div id="circle5"></div>
              </button>
            ) : (
              <button
                onClick={activateAccount}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Activate Account
              </button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

const mapStateToProps = ({ Auth }: any) => ({
  loading: Auth.loading,
});

export default connect(mapStateToProps, {
  activate,
})(Activate);
