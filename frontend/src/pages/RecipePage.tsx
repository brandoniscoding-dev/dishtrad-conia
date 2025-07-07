import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Etape {
  id_etape: number;
  ordre: number;
  texte: string;
}

interface Recipe {
  id_recipe: number;
  title: string;
  url_video?: string;
  Etapes: Etape[];
}

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch(() => setError('Recette introuvable.'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
        <Navbar />
        {loading ? (
          <div className="text-center mt-10 text-amber-800 text-xl font-kameron animate-[pulse_1.5s_infinite]">
            Chargement...
          </div>
        ) : error || !recipe ? (
          <div className="text-center mt-10 text-red-600 text-xl font-kameron">
            {error || 'Recette introuvable.'}
          </div>
        ) : (
          <main className="container mx-auto px-4 pt-24 py-10 space-y-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-amber-800 hover:text-orange-600 transition-colors duration-200 font-kameron text-base"
              aria-label="Retour à l'accueil"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
            <div className="bg-white rounded-xl shadow-lg p-8 animate-[fade-in_0.6s_ease-out] transition-all duration-300 hover:shadow-xl">
              <h1 className="text-3xl font-bold text-amber-900 font-noto-serif mb-4">
                {recipe.title}
              </h1>
              <div className="space-y-4">
                {recipe.url_video && (
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-amber-800 font-kameron">
                      Vidéo
                    </h2>
                    <a
                      href={recipe.url_video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline font-kameron text-base"
                    >
                      Voir la vidéo
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-amber-800 font-kameron mb-2">
                    Étapes de préparation
                  </h2>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700 font-kameron text-base">
                    {recipe.Etapes?.sort((a, b) => a.ordre - b.ordre).map((etape) => (
                      <li key={etape.id_etape}>{etape.texte}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </main>
        )}
        <Footer />
      </div>
    </>
  );
};

export default RecipePage;