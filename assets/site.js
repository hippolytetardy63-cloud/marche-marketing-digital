/* Code commun au tableau de bord.
 *
 * Construit le menu lateral, puis remplit les blocs que chaque page declare :
 *   <div data-bloc="carte-france"></div>
 *   <span data-valeur="stats.total"></span>
 * Les pages n'ecrivent aucun JavaScript.
 *
 * Pour ajouter une page au menu : une ligne dans le tableau PAGES ci-dessous.
 */

(function () {
  "use strict";

  // Petites icones dessinees au trait, dans une grille de 24 x 24.
  var ICONES = {
    accueil: "M3 11l9-7 9 7M5 9.6V20h14V9.6",
    metier: "M4 7h16M4 12h10M4 17h7M18.5 15.5l2 2-4.5 4.5h-2v-2z",
    marche: "M4 20V11M9.3 20V4M14.7 20v-6M20 20v-9M3 20h18",
    acteurs: "M3 20V6l6-2.5V20M9 20V9l6 2v9M15 20v-6l5.5 1.8V20M2 20h20M5.6 9h.8M5.6 12.5h.8M11.6 13h.8",
    methode: "M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM19.3 14.6l1.5 1.1-1.7 3-1.8-.7a6 6 0 01-1.7 1l-.3 1.9h-3.4l-.3-1.9a6 6 0 01-1.7-1l-1.8.7-1.7-3 1.5-1.1a6 6 0 010-2l-1.5-1.1 1.7-3 1.8.7a6 6 0 011.7-1L11.9 3h3.4",
    profil: "M12 12a4 4 0 100-8 4 4 0 000 8zM4.5 20.5a7.5 7.5 0 0115 0"
  };

  var PAGES = [
    { groupe: "Le marché" },
    { fichier: "index.html",       titre: "Accueil",     icone: "accueil" },
    { fichier: "metier.html",      titre: "Le métier",   icone: "metier",  court: "Métier" },
    { fichier: "marche.html",      titre: "Le marché",   icone: "marche",  court: "Marché" },
    { fichier: "acteurs.html",     titre: "Acteurs",     icone: "acteurs" },
    { groupe: "Moi" },
    { fichier: "profil.html",      titre: "Mon profil",  icone: "profil",  court: "Profil" },
    { groupe: "Le site" },
    { fichier: "methode.html",     titre: "Méthode",     icone: "methode" }
  ];

  var D = window.DONNEES;
  var C = window.CARTE_FRANCE;

  // ------------------------------------------------------------------ outils

  function echapper(valeur) {
    return String(valeur == null ? "" : valeur)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function formaterDate(iso) {
    if (!iso) return "";
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!m) return iso;
    var mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet",
                "août", "septembre", "octobre", "novembre", "décembre"];
    return Number(m[3]) + " " + mois[Number(m[2]) - 1] + " " + m[1];
  }

  // 2688 -> "2 688 €", avec des espaces insecables pour ne jamais couper
  // un montant en fin de ligne.
  function euros(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") + "\u00a0€";
  }

  function blocs(nom) {
    return Array.prototype.slice.call(document.querySelectorAll('[data-bloc="' + nom + '"]'));
  }

  function pageCourante() {
    var fichier = location.pathname.split("/").pop();
    return fichier === "" ? "index.html" : fichier;
  }

  function icone(nom) {
    return "<svg viewBox='0 0 24 24' aria-hidden='true'><path d='" + ICONES[nom] + "'/></svg>";
  }

  // ------------------------------------------------------- menu et ossature

  // Le chiffre clé de chaque page, affiché dans le menu. Tous viennent des
  // données du jour ; la bulle d'aide dit ce qu'ils comptent.
  function chiffresDuMenu() {
    if (!D) return {};
    var scores = D.offres.map(function (o) { return o.ats && o.ats.score; })
      .filter(function (s) { return s != null; });
    var couverture = scores.length ? Math.round(scores.reduce(function (a, b) { return a + b; }, 0) / scores.length) : null;
    var c = {
      "marche.html": [D.stats.total, D.stats.total + " offres au dernier relevé"],
      "acteurs.html": [D.acteurs.entreprises_distinctes, D.acteurs.entreprises_distinctes + " entreprises qui recrutent"],
      "methode.html": [(D.serie || []).length, (D.serie || []).length + " relevés depuis le début"]
    };
    if (couverture != null) c["profil.html"] = [couverture + " %", "Mon CV couvre en moyenne " + couverture + " % des mots-clés des offres"];
    return c;
  }

  function poserOssature() {
    var courante = pageCourante();
    var chiffres = chiffresDuMenu();
    var pageActive = PAGES.filter(function (p) { return p.fichier && p.fichier === courante; })[0];
    var titreCourant = pageActive ? pageActive.titre : "";

    var liens = PAGES.map(function (p) {
      if (p.groupe) {
        return "<div class='groupe-nav'>" + echapper(p.groupe) + "</div>";
      }
      if (p.bientot) {
        return "<a class='bientot' aria-disabled='true'>" + icone(p.icone) +
          "<span>" + echapper(p.titre) + "</span></a>";
      }
      var actif = p.fichier === courante ? " aria-current='page'" : "";
      var c = chiffres[p.fichier];
      return "<a href='" + p.fichier + "'" + actif + ">" + icone(p.icone) +
        "<span>" + echapper(p.titre) + "</span>" +
        (c ? "<span class='badge-nav' title='" + echapper(c[1]) + "'>" + c[0] + "</span>" : "") + "</a>";
    }).join("");

    // Barre d'onglets en bas de l'écran, pour les petits écrans : les mêmes
    // pages que le menu, avec un intitulé court.
    var onglets = PAGES.filter(function (p) { return p.fichier && !p.bientot; }).map(function (p) {
      return "<a href='" + p.fichier + "'" + (p.fichier === courante ? " aria-current='page'" : "") + ">" +
        icone(p.icone) + "<span>" + echapper(p.court || p.titre) + "</span></a>";
    }).join("");

    var rome = D && D.meta.code_rome ? "<span class='rome'>ROME " + echapper(D.meta.code_rome) + "</span>" : "";
    var maj = D ? "<span class='pastille'><span class='point'></span>Relevé du " +
      formaterDate(D.meta.date) + "</span>" : "";

    var aside = document.createElement("aside");
    aside.className = "barre-laterale";
    aside.id = "barre-laterale";
    aside.innerHTML =
      "<div class='marque'>" +
        "<div class='titre'>Marché du métier</div>" +
        "<div class='metier'>Chargé de marketing digital</div>" + rome +
      "</div>" +
      "<nav class='navigation' aria-label='Navigation principale'>" + liens + "</nav>" +
      "<div class='pied-barre'>" + maj + "</div>";

    var voile = document.createElement("div");
    voile.className = "voile";

    var haut = document.createElement("div");
    haut.className = "barre-mobile";
    haut.innerHTML =
      "<button class='bouton-menu' type='button' aria-expanded='false' " +
      "aria-controls='barre-laterale' aria-label='Ouvrir le menu'>" +
      "<svg viewBox='0 0 24 24'><path d='M4 7h16M4 12h16M4 17h16'/></svg></button>" +
      "<span class='titre'>" + echapper(titreCourant) + "</span>";

    var barreOnglets = document.createElement("nav");
    barreOnglets.className = "onglets-bas";
    barreOnglets.setAttribute("aria-label", "Navigation rapide");
    barreOnglets.innerHTML = onglets;
    document.body.appendChild(barreOnglets);

    document.body.insertBefore(voile, document.body.firstChild);
    document.body.insertBefore(aside, document.body.firstChild);
    document.body.insertBefore(haut, document.body.firstChild);

    var bouton = haut.querySelector(".bouton-menu");

    function basculer(ouvert) {
      document.body.classList.toggle("menu-ouvert", ouvert);
      bouton.setAttribute("aria-expanded", String(ouvert));
      bouton.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
    }

    bouton.addEventListener("click", function () {
      basculer(!document.body.classList.contains("menu-ouvert"));
    });
    voile.addEventListener("click", function () { basculer(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") basculer(false);
    });
  }

  // ------------------------------------------------- blocs alimentes en data

  /* ===== Accueil : « À retenir » et tuiles vedettes ===== */

  // Flèche et écart par rapport au relevé précédent. Le sens est dit en
  // toutes lettres (▲/▼ et le chiffre), la couleur ne fait que l'appuyer.
  function tendance(actuel, precedent, unite) {
    if (precedent == null) return "";
    var e = actuel - precedent;
    if (e === 0) return "<span class='tendance stable'>= stable</span>";
    return "<span class='tendance " + (e > 0 ? "hausse" : "baisse") + "'>" +
      (e > 0 ? "▲ +" : "▼ −") + Math.abs(e) + (unite || "") + "</span>";
  }

  // Mini-courbe du nombre d'offres : une seule série, sans légende. Son
  // échelle est resserrée sur les valeurs, ce que dit la note dessous.
  function miniCourbe(valeurs) {
    if (valeurs.length < 2) return "";
    var L = 220, H = 48, min = Math.min.apply(null, valeurs), max = Math.max.apply(null, valeurs);
    var pts = valeurs.map(function (v, i) {
      var x = i / (valeurs.length - 1) * L;
      var y = max === min ? H / 2 : H - 4 - (v - min) / (max - min) * (H - 8);
      return x.toFixed(1) + "," + y.toFixed(1);
    });
    var dernier = pts[pts.length - 1].split(",");
    return "<svg class='mini-courbe' viewBox='0 0 " + L + " " + H + "' role='img' " +
      "aria-label='Évolution du nombre d’offres : de " + valeurs[0] + " à " + valeurs[valeurs.length - 1] + "'>" +
      "<polyline points='" + pts.join(" ") + "'/>" +
      "<circle cx='" + dernier[0] + "' cy='" + dernier[1] + "' r='3.5'/></svg>";
  }

  function poserVedette(el) {
    var S = D.serie || [], st = D.stats, miens = D.mes_departements;
    var der = S[S.length - 1] || {}, prec = S.length > 1 ? S[S.length - 2] : null, prem = S[0];
    var evolution = prem && prem.total ? Math.round((st.total - prem.total) / prem.total * 100) : null;
    var petites = [
      { v: st.cdi, l: "en CDI (" + st.cdi_pct + " %)", t: tendance(der.cdi, prec && prec.cdi) }
    ];
    Object.keys(miens).forEach(function (code) {
      var n = (der.mes_zones || {})[code];
      if (n == null) n = D.par_departement[code] || 0;
      petites.push({ v: n, l: "dans le " + miens[code], classe: n === 0 ? "creux" : "",
                     t: tendance(n, prec && (prec.mes_zones || {})[code]) });
    });
    var sal = D.salaires, cible = sal && sal.reperes.filter(function (r) { return r.nom === "Ma cible"; })[0];
    if (sal) {
      petites.push({ v: euros(sal.mediane), l: "salaire médian des CDI" +
        (cible ? " · ma cible : " + euros(cible.montant) : "") });
    }
    el.className = "vedette";
    el.innerHTML =
      "<div class='kpi tuile-vedette'>" +
        "<div class='etiquette'>Offres de chargé de marketing digital en France</div>" +
        "<div class='valeur'>" + st.total + " " + tendance(st.total, prec && prec.total) + "</div>" +
        (evolution != null && prem ? "<div class='etiquette'>" + (evolution > 0 ? "+" : evolution < 0 ? "−" : "") + Math.abs(evolution) +
          " % depuis le " + formaterDate(prem.date) + " · " + S.length + " relevés</div>" : "") +
        miniCourbe(S.map(function (p) { return p.total; })) +
        "<div class='note-mini'>Échelle resserrée : la courbe ne part pas de zéro.</div>" +
      "</div>" +
      "<div class='petites-tuiles'>" + petites.map(function (p) {
        return "<div class='kpi " + (p.classe || "") + "'><div class='valeur'>" + p.v + "</div>" +
          "<div class='etiquette'>" + p.l + "</div>" + (p.t ? "<div class='etiquette'>" + p.t + "</div>" : "") + "</div>";
      }).join("") + "</div>";
  }

  // Trois phrases écrites à partir des données du jour : aucune n'est
  // figée, chacune se recalcule à chaque relevé.
  function poserARetenir(el) {
    var phrases = [], miens = D.mes_departements, codes = Object.keys(miens);
    if (codes.length === 2) {
      var a = D.par_departement[codes[0]] || 0, b = D.par_departement[codes[1]] || 0;
      var fort = a >= b ? 0 : 1, faible = 1 - fort;
      var n = [a, b];
      phrases.push(a === b
        ? "Mes deux zones font jeu égal : " + a + " offre" + (a > 1 ? "s" : "") + " chacune."
        : "Le " + miens[codes[fort]] + " compte " + n[fort] + " offre" + (n[fort] > 1 ? "s" : "") +
          ", le " + miens[codes[faible]] + " " + n[faible] + " : c'est le " + miens[codes[fort]] + " qui porte ma recherche.");
    }
    var M = D.mots_metier;
    if (M && M.mots.length) {
      var m = M.mots[0];
      phrases.push("« " + m.nom + " » est citée dans " + m.apres_pct + " % des offres, contre " +
        m.avant_pct + " % le " + formaterDate(M.avant.date) +
        (m.lecture === "a_confirmer" ? " — un signal encore à confirmer." : "."));
    }
    var S = D.salaires, cible = S && S.reperes.filter(function (r) { return r.nom === "Ma cible"; })[0];
    if (cible) {
      phrases.push(cible.pct + " % des CDI qui affichent un salaire paient au moins ma cible de " +
        euros(cible.montant) + ".");
    }
    if (!phrases.length) { el.remove(); return; }
    el.className = "a-retenir";
    el.innerHTML = "<p class='a-retenir-titre'>À retenir aujourd'hui</p><ul>" +
      phrases.map(function (p) { return "<li>" + echapper(p).replace(/&#39;/g, "'") + "</li>"; }).join("") + "</ul>";
  }

  /* Sommaire collant des pages longues : une pastille par titre de section,
   * qui reste en haut de l'écran et signale la section en cours. */
  function poserSommairePage(el) {
    var titres = Array.prototype.slice.call(document.querySelectorAll(".principal h2"));
    if (titres.length < 3) { el.remove(); return; }
    var pris = {};
    var liens = titres.map(function (h) {
      var id = sansAccent(h.textContent).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
      while (pris[id]) id += "-bis";
      pris[id] = true;
      h.id = h.id || id;
      return "<a href='#" + h.id + "'>" + echapper(h.textContent) + "</a>";
    });
    el.className = "sommaire-page";
    el.innerHTML = "<div class='sommaire-defile'>" + liens.join("") + "</div>";
    var parId = {};
    Array.prototype.forEach.call(el.querySelectorAll("a"), function (a) { parId[a.hash.slice(1)] = a; });
    if (!("IntersectionObserver" in window)) return;
    var observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        Array.prototype.forEach.call(el.querySelectorAll("a"), function (a) { a.removeAttribute("aria-current"); });
        var a = parId[e.target.id];
        a.setAttribute("aria-current", "true");
        a.scrollIntoView({ block: "nearest", inline: "nearest" });
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    titres.forEach(function (h) { observateur.observe(h); });
  }

  function poserKpis(el) {
    var st = D.stats, parDep = D.par_departement, miens = D.mes_departements;
    var codes = Object.keys(miens);
    var indicateurs = [
      { v: st.total, l: "offres en France", classe: "principal" },
      { v: st.cdi, l: "en CDI, soit " + st.cdi_pct + " % du total" },
      { v: st.idf_pct + " %", l: "des offres en Île-de-France" }
    ];
    codes.forEach(function (code) {
      var n = parDep[code] || 0;
      indicateurs.push({
        v: n,
        l: "dans le " + miens[code],
        classe: n === 0 ? "creux" : ""
      });
    });
    el.className = "kpis";
    el.innerHTML = indicateurs.map(function (i) {
      return "<div class='kpi " + (i.classe || "") + "'>" +
        "<div class='valeur'>" + i.v + "</div>" +
        "<div class='etiquette'>" + i.l + "</div></div>";
    }).join("");
  }

  function poserSource(el) {
    var m = D.meta;
    var lignes = [
      ["Canal", m.canal],
      ["Requête", "codeROME=" + m.code_rome + ", " + m.perimetre + ", sans autre filtre"],
      ["Date", formaterDate(m.date)],
      ["Total", D.stats.total + " offres, lues dans l'en-tête Content-Range"],
      ["Limites", m.limite_par_appel + " par appel, " + m.limite_par_requete + " par requête"],
      ["Fichier", m.fichier]
    ];
    el.classList.add("source");
    el.innerHTML = "<dl>" + lignes.map(function (l) {
      return "<dt>" + l[0] + "</dt><dd>" + echapper(l[1]) + "</dd>";
    }).join("") + "</dl>";
  }

  function maximumDepartement() {
    var max = 0;
    Object.keys(D.par_departement).forEach(function (k) {
      if (D.par_departement[k] > max) max = D.par_departement[k];
    });
    return max;
  }

  /* Le fond de carte s'arrete a la metropole. Les offres d'outre-mer, celles
     dont le poste est declare "France" sans precision et celles sans lieu
     exploitable n'y figurent pas. On l'annonce sous la carte : sans cela
     elles disparaitraient sans trace et le total lu sur la carte ne
     correspondrait plus au total affiche ailleurs. */
  function noteHorsCarte() {
    var h = D.hors_carte;
    if (!h || !h.total) return "";
    var motifs = h.detail.map(function (d) {
      return d.offres + " " + d.motif;
    }).join(", ");
    return "<p class='note-carte'>" + h.total + " offre" + (h.total > 1 ? "s" : "") +
      " ne figure" + (h.total > 1 ? "nt" : "") + " pas sur cette carte (" +
      echapper(motifs) + ") : la métropole n'est pas tout le marché.</p>";
  }

  function poserCarteFrance(el) {
    if (!C) { el.innerHTML = "<p class='vide-message'>Fond de carte absent.</p>"; return; }
    var parDep = D.par_departement, miens = D.mes_departements, max = maximumDepartement();

    function couleur(n) {
      if (!n) return "var(--carte-vide)";
      var r = n / max;
      if (r <= 0.2) return "var(--c1)";
      if (r <= 0.4) return "var(--c2)";
      if (r <= 0.6) return "var(--c3)";
      if (r <= 0.8) return "var(--c4)";
      return "var(--c5)";
    }

    function phrase(nom, code, n) {
      return nom + " (" + code + ") · " + (n ? n + " offre" + (n > 1 ? "s" : "") : "aucune offre");
    }

    // Pas de balise <title> : elle ferait apparaitre une seconde infobulle,
    // celle du navigateur, par-dessus la notre. L'etiquette accessible joue
    // le meme role pour les lecteurs d'ecran.
    var chemins = Object.keys(C.traces).map(function (code) {
      var n = parDep[code] || 0;
      var nom = C.noms[code];
      var classes = [];
      if (Object.prototype.hasOwnProperty.call(miens, code)) classes.push("mien");
      if (n) classes.push("cliquable");
      return "<path d='" + C.traces[code] + "' fill='" + couleur(n) + "'" +
        (classes.length ? " class='" + classes.join(" ") + "'" : "") +
        " data-code='" + code + "' data-nom='" + echapper(nom) + "' data-n='" + n + "'" +
        (n ? " tabindex='0' role='button'" : "") +
        " aria-label='" + echapper(phrase(nom, code, n)) + "'></path>";
    }).join("");

    var cases = ["--c1", "--c2", "--c3", "--c4", "--c5"].map(function (v) {
      return "<span class='case' style='background:var(" + v + ")'></span>";
    }).join("");

    el.classList.add("bloc-carte");
    el.innerHTML =
      "<div class='carte-zone'>" +
        "<svg viewBox='0 0 " + C.largeur + " " + C.hauteur + "' role='img' " +
        "aria-label=\"Carte de France du nombre d'offres par département. " +
        "Cliquez sur un département pour voir ses offres.\">" + chemins + "</svg>" +
        "<div class='carte-infobulle' hidden></div>" +
      "</div>" +
      "<div class='legende-carte'><span>aucune</span>" +
      "<span class='cases'>" + cases + "</span><span>" + max + " offres</span>" +
      "<span class='consigne'>cliquez sur un département</span></div>" +
      noteHorsCarte() +
      "<div class='carte-detail' hidden></div>";

    var zone = el.querySelector(".carte-zone");
    var bulle = el.querySelector(".carte-infobulle");
    var detail = el.querySelector(".carte-detail");
    var choisi = null;

    function montrerBulle(chemin, evenement) {
      bulle.hidden = false;
      bulle.textContent = phrase(chemin.dataset.nom, chemin.dataset.code,
                                 Number(chemin.dataset.n));
      var cadre = zone.getBoundingClientRect();
      var x = evenement.clientX - cadre.left;
      var y = evenement.clientY - cadre.top;
      // On garde l'infobulle a l'interieur de la carte.
      var largeur = bulle.offsetWidth;
      bulle.style.left = Math.max(0, Math.min(x + 14, cadre.width - largeur - 4)) + "px";
      bulle.style.top = Math.max(0, y - bulle.offsetHeight - 10) + "px";
    }

    function selectionner(code) {
      Array.prototype.forEach.call(zone.querySelectorAll("path"), function (p) {
        p.classList.toggle("actif", p.dataset.code === code);
      });
      if (!code) { detail.hidden = true; detail.innerHTML = ""; return; }

      var liste = D.offres.filter(function (o) { return o.departement === code; });
      var nom = C.noms[code] || code;
      var reste = liste.length - 6;
      detail.hidden = false;
      detail.innerHTML =
        "<div class='carte-detail-tete'>" +
          "<strong>" + echapper(nom) + " (" + code + ")</strong>" +
          "<span>" + liste.length + " offre" + (liste.length > 1 ? "s" : "") + "</span>" +
          "<button type='button' class='fermer-detail'>fermer</button>" +
        "</div>" +
        liste.slice(0, 6).map(carteOffre).join("") +
        (reste > 0 ? "<p class='note-detail'>et " + reste + " autre" +
          (reste > 1 ? "s" : "") + ", dans la liste complète plus bas.</p>" : "");
      detail.querySelector(".fermer-detail").addEventListener("click", function () {
        choisi = null;
        selectionner(null);
      });
    }

    zone.addEventListener("mousemove", function (e) {
      var chemin = e.target.closest("path");
      if (chemin) montrerBulle(chemin, e);
      else bulle.hidden = true;
    });
    zone.addEventListener("mouseleave", function () { bulle.hidden = true; });

    zone.addEventListener("click", function (e) {
      var chemin = e.target.closest("path.cliquable");
      if (!chemin) return;
      choisi = choisi === chemin.dataset.code ? null : chemin.dataset.code;
      selectionner(choisi);
      if (choisi) detail.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });

    zone.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var chemin = e.target.closest("path.cliquable");
      if (!chemin) return;
      e.preventDefault();
      choisi = choisi === chemin.dataset.code ? null : chemin.dataset.code;
      selectionner(choisi);
    });
  }

  function poserBarresDepartements(el) {
    var parDep = D.par_departement, miens = D.mes_departements, max = maximumDepartement();
    var combien = Number(el.dataset.combien || 8);

    var classement = Object.keys(parDep)
      .map(function (k) { return [k, parDep[k]]; })
      .sort(function (a, b) { return b[1] - a[1]; })
      .slice(0, combien);

    Object.keys(miens).forEach(function (code) {
      var present = classement.some(function (l) { return l[0] === code; });
      if (!present) classement.push([code, parDep[code] || 0]);
    });

    el.innerHTML = classement.map(function (l) {
      var mien = Object.prototype.hasOwnProperty.call(miens, l[0]);
      var nom = C && C.noms[l[0]] ? C.noms[l[0]] : l[0];
      var largeur = max ? Math.round(l[1] * 100 / max) : 0;
      return "<div class='barre-ligne" + (mien ? " mienne" : "") + "' title='" + echapper(nom) + "'>" +
        "<span class='lieu'>" + l[0] + "</span>" +
        "<span class='barre-piste'><span class='barre-remplie' style='width:" + largeur + "%'></span></span>" +
        "<span class='n'>" + l[1] + "</span></div>";
    }).join("");
  }

  function poserBarresContrats(el) {
    var contrats = D.par_contrat;
    if (!contrats || !contrats.length) return;
    var combien = Number(el.dataset.combien || contrats.length);
    var max = contrats[0][1];
    el.innerHTML = contrats.slice(0, combien).map(function (l) {
      var largeur = Math.round(l[1] * 100 / max);
      return "<div class='barre-ligne large'>" +
        "<span class='lieu' title='" + echapper(l[0]) + "'>" + echapper(l[0]) + "</span>" +
        "<span class='barre-piste'><span class='barre-remplie' style='width:" + largeur + "%'></span></span>" +
        "<span class='n'>" + l[1] + "</span></div>";
    }).join("");
  }

  function poserReserves(el) {
    var st = D.stats, parDep = D.par_departement, miens = D.mes_departements;
    var points = [
      "<strong>" + st.avec_salaire_pct + " % des offres seulement affichent un salaire.</strong> " +
        "Toute analyse salariale reposera sur " + st.avec_salaire + " offres, pas sur " + st.total + ".",
      "<strong>Le champ « compétences » n'est rempli que dans " + st.avec_competences_pct +
        " % des cas.</strong> Pour compter les outils demandés, il faudra lire le texte des annonces."
    ];
    if (st.premier_employeur_pct >= 10) {
      points.push("<strong>Un seul employeur, " + echapper(st.premier_employeur) + ", publie " +
        st.offres_premier_employeur + " offres</strong> — " + st.premier_employeur_pct +
        " % du total. Une part notable de ce marché relève de la mise en relation, pas de l'emploi salarié.");
    }
    Object.keys(miens).forEach(function (code) {
      if ((parDep[code] || 0) === 0) {
        points.push("<strong>Zéro offre dans le " + miens[code] + " ne signifie pas zéro emploi.</strong> " +
          "Trois hypothèses restent à départager : le métier s'y exerce sous un autre intitulé, " +
          "les employeurs locaux ne passent pas par France Travail, ou le marché y est réellement absent.");
      }
    });
    el.classList.add("reserve");
    el.innerHTML = "<ul>" + points.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul>";
  }

  /* Les mots-cles de l'offre face a mon CV, comme les compare un logiciel
   * de tri des candidatures (ATS). Calcule par generer_site.py. Le sens ne
   * repose pas que sur la couleur : un ✓ pour ce que j'ai, « à ajouter »
   * pour ce qui manque. */
  function blocAts(ats) {
    if (!ats) return "";
    var n = ats.acquis.length + ats.manquants.length;
    if (!n) {
      return "<p class='ats'><span class='ats-titre'>Mots-clés ATS</span> " +
        "aucun outil reconnu dans l'annonce : à lire en entier.</p>";
    }
    return "<p class='ats'><span class='ats-titre'>Mots-clés ATS · mon CV en couvre " +
        ats.acquis.length + " sur " + n + "</span>" +
      ats.acquis.map(function (m) { return "<span class='ats-ok'>✓ " + echapper(m) + "</span>"; }).join("") +
      (ats.manquants.length ? "<span class='ats-sep'>à ajouter :</span>" +
        ats.manquants.map(function (m) { return "<span class='ats-manque'>" + echapper(m) + "</span>"; }).join("") : "") +
      "</p>";
  }

  function carteOffre(o) {
    // Le metier et l'experience ne sont fournis que pour la liste des
    // metiers voisins ; ailleurs, la carte reste telle qu'avant.
    var etiquettes = (o.metier ? "<span class='etiq'>" + echapper(o.metier) + "</span>" : "") +
      "<span class='etiq'>" + echapper(o.contrat) + "</span>" +
      (o.experience ? "<span class='etiq gris'>" + echapper(o.experience) + "</span>" : "") +
      (o.salaire ? "<span class='etiq gris'>" + echapper(o.salaire) + "</span>"
                 : "<span class='etiq gris'>salaire non affiché</span>");
    return "<article class='offre'>" +
      "<h3><a href='" + echapper(o.url) + "' target='_blank' rel='noopener'>" +
        echapper(o.intitule) + "</a></h3>" +
      "<p class='infos'>" + echapper(o.entreprise || "entreprise non précisée") +
        " · " + echapper(o.lieu) + " · publiée le " + formaterDate(o.date) + "</p>" +
      "<div class='etiquettes'>" + etiquettes + "</div>" + blocAts(o.ats) + "</article>";
  }

  function poserDernieresOffres(el) {
    var combien = Number(el.dataset.combien || 4);
    el.innerHTML = D.offres.slice(0, combien).map(carteOffre).join("") +
      "<a class='lien-suite' href='marche.html'>Voir les " + D.stats.total + " offres →</a>";
  }

  /* Âge d'une offre en jours, compté depuis la date du relevé (et non
   * depuis aujourd'hui) : la page dit la même chose quel que soit le jour
   * où on la lit. */
  function ageEnJours(o) {
    var a = Date.parse(o.date), b = Date.parse(D.meta.date);
    return isNaN(a) || isNaN(b) ? null : Math.max(0, Math.round((b - a) / 86400000));
  }

  function sansAccent(t) {
    return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  // Jauge de correspondance ATS : la valeur est écrite, la barre l'illustre.
  function jaugeAts(ats) {
    if (!ats || ats.score == null) {
      return "<div class='jauge-ats vide' title='Aucun outil reconnu dans l’annonce'>" +
        "<span class='jauge-valeur'>—</span><span class='jauge-legende'>ATS</span></div>";
    }
    var n = ats.acquis.length + ats.manquants.length;
    return "<div class='jauge-ats' title='Mon CV couvre " + ats.acquis.length + " mot(s)-clé(s) sur " + n + "'>" +
      "<span class='jauge-valeur'>" + ats.score + " %</span>" +
      "<span class='jauge-piste'><span class='jauge-remplie' data-largeur='" + ats.score + "'></span></span>" +
      "<span class='jauge-legende'>ATS · " + ats.acquis.length + "/" + n + "</span></div>";
  }

  function carteCompacte(o) {
    var age = ageEnJours(o);
    var badges = (age != null && age <= 2 ? "<span class='etiq nouveau'>Nouveau</span>" : "") +
      "<span class='etiq'>" + echapper(o.contrat) + "</span>" +
      (age != null ? "<span class='etiq gris'>" + (age === 0 ? "aujourd'hui" : "il y a " + age + " j") + "</span>" : "");
    return "<details class='offre compacte'><summary>" +
      "<div class='compacte-texte'>" +
        "<h3>" + echapper(o.intitule) + "</h3>" +
        "<p class='infos'>" + echapper(o.lieu) + "</p>" +
        "<div class='etiquettes'>" + badges + "</div>" +
      "</div>" + jaugeAts(o.ats) + "</summary>" +
      "<div class='compacte-detail'>" +
        "<p class='infos'>" + echapper(o.entreprise || "entreprise non précisée") +
          " · publiée le " + formaterDate(o.date) + " · " +
          echapper(o.salaire || "salaire non affiché") + "</p>" +
        blocAts(o.ats) +
        "<a class='lien-suite' href='" + echapper(o.url) + "' target='_blank' rel='noopener'>Ouvrir l'annonce sur France Travail ↗</a>" +
      "</div></details>";
  }

  function poserOffres(el) {
    var miens = D.mes_departements;
    var PAS = 20, affichees = PAS;
    var etat = { texte: "", tri: "date", actifs: {} };

    var filtres = [
      ["cdi", "CDI", function (o) { return o.contrat === "CDI"; }],
      ["zones", "Mes zones", function (o) { return Object.prototype.hasOwnProperty.call(miens, o.departement); }],
      ["salaire", "Salaire affiché", function (o) { return o.salaire_mensuel != null; }],
      ["recent", "Moins d'un mois", function (o) { var a = ageEnJours(o); return a != null && a <= 30; }]
    ];
    var tris = {
      date: function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; },
      // Score d'abord ; à égalité, l'offre où je couvre le plus de
      // mots-clés passe devant (5 sur 5 vaut mieux que 1 sur 1), puis la
      // plus récente.
      ats: function (a, b) {
        var sa = a.ats && a.ats.score != null ? a.ats.score : -1, sb = b.ats && b.ats.score != null ? b.ats.score : -1;
        if (sa !== sb) return sb - sa;
        var na = a.ats ? a.ats.acquis.length : 0, nb = b.ats ? b.ats.acquis.length : 0;
        if (na !== nb) return nb - na;
        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
      },
      salaire: function (a, b) { return (b.salaire_mensuel || 0) - (a.salaire_mensuel || 0); }
    };

    el.innerHTML =
      "<div class='barre-outils'>" +
        "<input type='search' class='recherche' placeholder='Rechercher : intitulé, entreprise, ville…' aria-label='Rechercher une offre'>" +
        "<div class='filtres'>" + filtres.map(function (f) {
          return "<button type='button' data-f='" + f[0] + "' aria-pressed='false'>" + f[1] + "</button>";
        }).join("") + "</div>" +
        "<label class='tri'>Trier par <select>" +
          "<option value='date'>plus récentes</option>" +
          "<option value='ats'>meilleur score ATS</option>" +
          "<option value='salaire'>meilleur salaire</option>" +
        "</select></label>" +
        "<p class='compte' aria-live='polite'></p>" +
      "</div><div class='liste'></div><button class='plus' hidden></button>";

    var zoneListe = el.querySelector(".liste"), boutonPlus = el.querySelector(".plus");
    var compte = el.querySelector(".compte");

    function selection() {
      var mot = sansAccent(etat.texte.trim());
      return D.offres.filter(function (o) {
        var garde = filtres.every(function (f) { return !etat.actifs[f[0]] || f[2](o); });
        return garde && (!mot || sansAccent(o.intitule + " " + o.entreprise + " " + o.lieu).indexOf(mot) >= 0);
      }).sort(tris[etat.tri]);
    }

    function dessiner() {
      var liste = selection();
      compte.textContent = liste.length + " offre" + (liste.length > 1 ? "s" : "") + " sur " + D.offres.length;
      if (!liste.length) {
        zoneListe.innerHTML = "<p class='vide-message'>Aucune offre ne correspond à ces critères.</p>";
        boutonPlus.hidden = true;
        return;
      }
      zoneListe.innerHTML = liste.slice(0, affichees).map(carteCompacte).join("");
      // Largeur des jauges posée par le script : aucun style écrit dans le HTML.
      Array.prototype.forEach.call(zoneListe.querySelectorAll(".jauge-remplie"), function (j) {
        j.style.width = j.dataset.largeur + "%";
      });
      var reste = liste.length - affichees;
      boutonPlus.hidden = reste <= 0;
      if (reste > 0) boutonPlus.textContent = "Afficher " + Math.min(reste, PAS) + " offres de plus (" + reste + " restantes)";
    }

    el.querySelector(".filtres").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      etat.actifs[b.dataset.f] = !etat.actifs[b.dataset.f];
      b.setAttribute("aria-pressed", String(etat.actifs[b.dataset.f]));
      affichees = PAS; dessiner();
    });
    el.querySelector(".recherche").addEventListener("input", function (e) { etat.texte = e.target.value; affichees = PAS; dessiner(); });
    el.querySelector(".tri select").addEventListener("change", function (e) { etat.tri = e.target.value; dessiner(); });
    boutonPlus.addEventListener("click", function () { affichees += PAS; dessiner(); });
    dessiner();
  }

  function poserIdentite(el) {
    var p = D.profil || {};
    var liens = [];
    if (p.mail) liens.push("<a href='mailto:" + echapper(p.mail) + "'>" + echapper(p.mail) + "</a>");
    if (p.linkedin) liens.push("<a href='" + echapper(p.linkedin) + "' target='_blank' rel='noopener'>LinkedIn ↗</a>");
    el.innerHTML =
      "<div class='identite'>" +
        "<div class='identite-nom'>" + echapper(p.nom || "") + "</div>" +
        "<div class='identite-titre'>" + echapper(p.titre || "") + "</div>" +
        "<div class='identite-liens'>" + liens.join(" · ") + "</div>" +
      "</div>";
  }

  function poserCv(el) {
    var p = D.profil || {};
    if (!p.cv_pdf) { el.innerHTML = "<p class='vide-message'>Aucun CV déclaré.</p>"; return; }

    // On affiche l'image plutot que le PDF integre : le rendu est identique,
    // il est net tout de suite, et les navigateurs de telephone n'affichent
    // pas toujours un PDF dans une page. Les deux boutons donnent acces au
    // vrai fichier, avec son texte selectionnable.
    var apercu = p.cv_apercu
      ? "<a class='visionneuse-cv' href='" + echapper(p.cv_pdf) + "' target='_blank' rel='noopener' " +
        "title='Ouvrir le PDF dans un nouvel onglet'>" +
        "<img src='" + echapper(p.cv_apercu) + "' alt='CV de " + echapper(p.nom || "") +
        ", cliquer pour ouvrir le PDF' loading='lazy'></a>"
      : "";

    el.innerHTML = apercu +
      "<div class='actions-cv'>" +
        "<a class='bouton-cv' href='" + echapper(p.cv_pdf) + "' download>Télécharger le PDF</a>" +
        "<a class='bouton-cv secondaire' href='" + echapper(p.cv_pdf) +
          "' target='_blank' rel='noopener'>Ouvrir dans un onglet</a>" +
      "</div>";
  }

  function listeOutils(el, source, options) {
    var outils = (D.outils && D.outils[source]) || [];
    var combien = Number(el.dataset.combien || outils.length);
    var liste = outils.slice(0, combien);
    if (!liste.length) {
      el.innerHTML = "<p class='vide-message'>" + (options.vide || "Rien à afficher.") + "</p>";
      return;
    }
    var max = outils.length ? outils[0].offres : 1;
    var maxLocal = liste[0].offres;
    el.innerHTML = liste.map(function (o) {
      var largeur = Math.round(o.offres * 100 / (options.echelleGlobale ? max : maxLocal));
      var classe = options.marquerAcquis
        ? (o.acquis ? " acquis" : " manquant")
        : (options.classe ? " " + options.classe : "");
      return "<div class='ligne-outil" + classe + "'>" +
        "<span class='nom' title='" + echapper(o.famille) + "'>" + echapper(o.nom) + "</span>" +
        "<span class='barre-piste'><span class='barre-remplie' style='width:" + largeur + "%'></span></span>" +
        "<span class='n'>" + o.pct + " %</span></div>";
    }).join("");
  }

  function poserOutilsDemandes(el) {
    listeOutils(el, "demandes", { marquerAcquis: true, echelleGlobale: true });
  }
  function poserOutilsManquants(el) {
    listeOutils(el, "manquants", {
      classe: "manquant",
      vide: "Aucun outil demandé ne me manque aujourd'hui."
    });
  }
  function poserOutilsAcquis(el) {
    listeOutils(el, "acquis", {
      classe: "acquis",
      vide: "Aucun de mes outils n'apparaît dans les offres."
    });
  }

  /* Bouton de mise a jour. Il n'apparait que si le site est servi par
     scripts/outils/serveur_local.py : une page ouverte en double-clic, ou servie
     par un serveur de fichiers ordinaire, n'a aucun moyen de lancer un
     programme sur la machine. Dans ce cas on explique plutot que de
     montrer un bouton qui ne ferait rien. */
  function poserBoutonMaj(el) {
    // Version publique en ligne (GitHub Pages) : les relevés s'y font tout
    // seuls, il n'y a ni bouton ni consigne à afficher.
    if (/\.github\.io$/.test(location.hostname)) { el.remove(); return; }
    fetch("api/etat", { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function () { dessinerBouton(el); })
      .catch(function () {
        el.innerHTML = "<p class='note-maj'>Pour lancer une mise à jour d'ici, " +
          "ouvrez le site avec <code>ouvrir-le-site.command</code> (Mac) " +
          "ou <code>ouvrir-le-site.bat</code> (Windows).</p>";
      });
  }

  function dessinerBouton(el) {
    el.innerHTML =
      "<button class='bouton-maj' type='button'>Mettre à jour les données</button>" +
      "<p class='note-maj' hidden></p>";

    var bouton = el.querySelector("button");
    var note = el.querySelector(".note-maj");

    function dire(texte, classe) {
      note.hidden = false;
      note.textContent = texte;
      note.className = "note-maj" + (classe ? " " + classe : "");
    }

    bouton.addEventListener("click", function () {
      bouton.disabled = true;
      bouton.textContent = "Récupération en cours…";
      dire("Interrogation de l'API France Travail, puis régénération du site. "
         + "Cela prend une dizaine de secondes.");

      fetch("api/extraction", {
        method: "POST",
        headers: { "X-Demande-Locale": "1" }
      })
        .then(function (r) { return r.json().then(function (d) { return { http: r.status, d: d }; }); })
        .then(function (reponse) {
          var d = reponse.d;
          if (!d.ok) {
            bouton.disabled = false;
            bouton.textContent = "Réessayer";
            dire("Échec : " + d.message + ".", "echec");
            return;
          }
          var ecart = d.ecart === null || d.ecart === undefined ? ""
            : (d.ecart > 0 ? " (+" + d.ecart + ")"
              : d.ecart < 0 ? " (" + d.ecart + ")" : " (inchangé)");
          bouton.textContent = "Relevé enregistré";
          dire(d.total + " offres" + ecart + " · " + d.nombre_de_releves +
               " relevés au total. La page se recharge…", "reussite");
          setTimeout(function () { location.reload(); }, 1800);
        })
        .catch(function () {
          bouton.disabled = false;
          bouton.textContent = "Réessayer";
          dire("Le serveur local ne répond plus. La fenêtre noire est-elle "
             + "toujours ouverte ?", "echec");
        });
    });
  }

  /* Courbe du nombre d'offres au fil des relevés.
   *
   * Une seule courbe, volontairement. Deux séries auraient demandé deux
   * couleurs : le validateur de palette les a refusées, l'écart entre le
   * vert et le terracotta du site tombant à ΔE 4,8 en mode sombre sous
   * daltonisme protanope — indistinguables. Les autres chiffres sont donc
   * dans le tableau, où ils se lisent mieux qu'en seconde ligne. */
  function poserEvolution(el) {
    var serie = D.serie || [];
    if (serie.length < 2) {
      el.innerHTML = "<p class='vide-message'>Il faut au moins deux relevés pour " +
        "tracer une évolution. Il y en a " + serie.length + ".</p>";
      return;
    }

    var L = 640, H = 230;
    var marge = { haut: 18, droite: 16, bas: 34, gauche: 42 };
    var largeur = L - marge.gauche - marge.droite;
    var hauteur = H - marge.haut - marge.bas;

    var totaux = serie.map(function (p) { return p.total; });
    var mini = Math.min.apply(null, totaux);
    var maxi = Math.max.apply(null, totaux);
    // L'axe ne part pas de zéro : sur des écarts de quelques offres, il
    // écraserait la courbe. Les graduations le disent explicitement.
    var marche = Math.max(2, Math.ceil((maxi - mini) * 0.35));
    var bas = Math.max(0, mini - marche);
    var haut = maxi + marche;

    function px(i) {
      return marge.gauche + (serie.length === 1 ? largeur / 2
        : (i / (serie.length - 1)) * largeur);
    }
    function py(valeur) {
      return marge.haut + hauteur - ((valeur - bas) / (haut - bas)) * hauteur;
    }

    var graduations = [bas, Math.round((bas + haut) / 2), haut];
    var grille = graduations.map(function (v) {
      return "<line class='grille' x1='" + marge.gauche + "' y1='" + py(v) +
        "' x2='" + (L - marge.droite) + "' y2='" + py(v) + "'/>" +
        "<text class='axe' x='" + (marge.gauche - 8) + "' y='" + (py(v) + 4) +
        "' text-anchor='end'>" + v + "</text>";
    }).join("");

    var trace = serie.map(function (p, i) {
      return (i ? "L" : "M") + px(i).toFixed(1) + " " + py(p.total).toFixed(1);
    }).join(" ");

    var aire = "M" + px(0).toFixed(1) + " " + (marge.haut + hauteur) +
      " " + trace.slice(1) +
      " L" + px(serie.length - 1).toFixed(1) + " " + (marge.haut + hauteur) + " Z";

    var points = serie.map(function (p, i) {
      return "<circle class='point' cx='" + px(i).toFixed(1) + "' cy='" +
        py(p.total).toFixed(1) + "' r='5'/>";
    }).join("");

    // Étiquettes de dates : seulement la première et la dernière si la série
    // est longue, sinon elles se chevauchent.
    var pas = serie.length > 6 ? serie.length - 1 : 1;
    var dates = serie.map(function (p, i) {
      if (i % pas !== 0 && i !== serie.length - 1) return "";
      var ancrage = i === 0 ? "start" : (i === serie.length - 1 ? "end" : "middle");
      return "<text class='axe' x='" + px(i).toFixed(1) + "' y='" + (H - 12) +
        "' text-anchor='" + ancrage + "'>" + p.date.slice(8) + "/" + p.date.slice(5, 7) +
        "</text>";
    }).join("");

    // Le dernier point est étiqueté : c'est le chiffre qu'on vient lire.
    var dernier = serie[serie.length - 1];
    var etiquette = "<text class='valeur-fin' x='" + (px(serie.length - 1) - 10).toFixed(1) +
      "' y='" + (py(dernier.total) - 12).toFixed(1) + "' text-anchor='end'>" +
      dernier.total + "</text>";

    var premier = serie[0];
    var ecart = dernier.total - premier.total;
    var motEcart = ecart > 0 ? "+" + ecart : (ecart < 0 ? String(ecart) : "aucun écart");

    el.innerHTML =
      "<div class='graphe-zone'>" +
        "<svg class='graphe' viewBox='0 0 " + L + " " + H + "' role='img' " +
        "aria-label=\"Évolution du nombre d'offres, de " + premier.date +
        " à " + dernier.date + " : de " + premier.total + " à " + dernier.total + " offres.\">" +
          grille +
          "<path class='aire' d='" + aire + "'/>" +
          "<path class='courbe' d='" + trace + "'/>" +
          points + dates + etiquette +
        "</svg>" +
        "<div class='graphe-bulle' hidden></div>" +
      "</div>" +
      "<p class='note-graphe'>" + serie.length + " relevés, du " +
        formaterDate(premier.date) + " au " + formaterDate(dernier.date) + " · " +
        motEcart + " offre" + (Math.abs(ecart) > 1 ? "s" : "") +
        ". L'axe vertical ne part pas de zéro.</p>" +
      "<table class='tableau-serie'><caption>Le détail de chaque relevé</caption>" +
        "<thead><tr><th>Relevé</th><th>Offres</th><th>Dont CDI</th>" +
        "<th>Salaire affiché</th>" +
        Object.keys(D.mes_departements).map(function (c) {
          return "<th>" + echapper(D.mes_departements[c]) + "</th>";
        }).join("") + "</tr></thead><tbody>" +
        serie.slice().reverse().map(function (p) {
          return "<tr><td>" + formaterDate(p.date) + "</td><td>" + p.total +
            "</td><td>" + p.cdi + "</td><td>" + p.avec_salaire + "</td>" +
            Object.keys(D.mes_departements).map(function (c) {
              return "<td>" + ((p.mes_zones || {})[c] || 0) + "</td>";
            }).join("") + "</tr>";
        }).join("") +
      "</tbody></table>";

    // Survol : la bulle suit le relevé le plus proche du curseur.
    var zone = el.querySelector(".graphe-zone");
    var svg = el.querySelector(".graphe");
    var bulle = el.querySelector(".graphe-bulle");
    var cercles = Array.prototype.slice.call(svg.querySelectorAll(".point"));

    zone.addEventListener("mousemove", function (e) {
      var cadre = svg.getBoundingClientRect();
      var ratio = (e.clientX - cadre.left) / cadre.width * L;
      var proche = 0, distance = Infinity;
      serie.forEach(function (p, i) {
        var d = Math.abs(px(i) - ratio);
        if (d < distance) { distance = d; proche = i; }
      });
      cercles.forEach(function (c, i) { c.classList.toggle("survole", i === proche); });
      var p = serie[proche];
      bulle.hidden = false;
      bulle.textContent = formaterDate(p.date) + " · " + p.total + " offres";
      var x = (px(proche) / L) * cadre.width;
      var y = (py(p.total) / H) * cadre.height;
      bulle.style.left = Math.max(0, Math.min(x - bulle.offsetWidth / 2,
        cadre.width - bulle.offsetWidth)) + "px";
      bulle.style.top = Math.max(0, y - bulle.offsetHeight - 12) + "px";
    });
    zone.addEventListener("mouseleave", function () {
      bulle.hidden = true;
      cercles.forEach(function (c) { c.classList.remove("survole"); });
    });
  }

  /* Les mots qui montent (question 5 du README) : chaque mot du métier,
   * au premier et au dernier relevé qui ont le texte des annonces. Les
   * chiffres et la lecture sont calculés par generer_site.py ; ici on ne
   * fait que les mettre en tableau. */
  function poserMotsMetier(el) {
    var M = D.mots_metier;
    if (!M) {
      el.innerHTML = "<p class='vide-message'>Il faut au moins deux relevés " +
        "avec le texte des annonces pour comparer les mots.</p>";
      return;
    }
    var LECTURES = {
      hausse: ["lecture-nette", "hausse nette"],
      baisse: ["lecture-nette", "baisse nette"],
      a_confirmer: ["lecture-doute", "à confirmer"]
    };
    function cellule(pct, n) {
      return "<td>" + pct + " %<span class='sous-valeur'>" + n + " offre" +
        (n > 1 ? "s" : "") + "</span></td>";
    }
    function entete(releve) {
      return "<th>" + formaterDate(releve.date) + "<span class='sous-valeur'>" +
        releve.offres_lues + " offres</span></th>";
    }
    el.innerHTML =
      "<table class='tableau-mots'><thead><tr><th>Mot</th>" +
        entete(M.avant) + entete(M.apres) + "<th>Écart</th><th>Lecture</th>" +
      "</tr></thead><tbody>" +
      M.mots.map(function (m) {
        var lecture = LECTURES[m.lecture];
        return "<tr><td>" + echapper(m.nom) + "</td>" +
          cellule(m.avant_pct, m.avant) + cellule(m.apres_pct, m.apres) +
          "<td class='insecable'>" + (m.ecart_pts > 0 ? "+" : "") + m.ecart_pts + " pts</td>" +
          "<td class='insecable " + lecture[0] + "'>" + lecture[1] + "</td></tr>";
      }).join("") +
      "</tbody></table>" +
      // Espaces insecables autour des guillemets et avant « % » : sans
      // elles, un guillemet peut se retrouver seul en debut de ligne.
      "<p class='note-graphe'>«\u00a0À confirmer\u00a0» : l'écart reste dans la marge du " +
        "hasard (fourchettes de confiance à 95\u00a0% qui se recouvrent). La mention " +
        "passera à «\u00a0hausse nette\u00a0» ou «\u00a0baisse nette\u00a0» quand ce ne sera plus le cas.</p>";
  }

  /* Les metiers voisins (M1703, E1112) face au metier principal. Les
   * chiffres viennent de generer_site.py ; chaque metier est pris a son
   * dernier releve, et rien ici ne se mele aux autres blocs du site. */
  function poserComparaisonMetiers(el) {
    var V = D.metiers_voisins;
    if (!V || !V.metiers.length) {
      el.innerHTML = "<p class='vide-message'>Aucun relevé des métiers voisins pour l'instant.</p>";
      return;
    }
    var zones = Object.keys(D.mes_departements);
    el.innerHTML =
      "<table class='tableau-metiers'><thead><tr><th>Métier</th>" +
        "<th>Offres en France</th><th>Dont CDI</th>" +
        zones.map(function (c) { return "<th>" + echapper(D.mes_departements[c]) + "</th>"; }).join("") +
      "</tr></thead><tbody>" +
      V.metiers.map(function (m) {
        return "<tr" + (m.principal ? " class='principal'" : "") + "><td><code>" +
          echapper(m.code) + "</code> " + echapper(m.libelle) +
          (m.principal ? "<span class='sous-valeur'>métier principal</span>" : "") + "</td>" +
          "<td>" + m.total + "</td><td>" + m.cdi_pct + " %</td>" +
          zones.map(function (c) { return "<td>" + (m.par_zone[c] || 0) + "</td>"; }).join("") +
          "</tr>";
      }).join("") +
      "</tbody></table>" +
      "<p class='note-graphe'>Chaque métier à son dernier relevé, le " +
        formaterDate(V.metiers[0].date) + ". Toute la France, API France Travail.</p>";
  }

  function poserOffresMesZones(el) {
    var V = D.metiers_voisins;
    if (!V || !V.offres_zones.length) {
      el.innerHTML = "<p class='vide-message'>Aucun CDI dans mes zones au dernier relevé.</p>";
      return;
    }
    var html = "", courant = null;
    V.offres_zones.forEach(function (o) {
      if (o.departement !== courant) {
        courant = o.departement;
        var n = V.offres_zones.filter(function (x) { return x.departement === courant; }).length;
        html += "<h3 class='titre-zone'>" + echapper(D.mes_departements[courant]) +
          " · " + n + " CDI</h3>";
      }
      html += carteOffre(o);
    });
    el.innerHTML = html +
      "<p class='note-graphe'>" + V.ecartees_non_cdi + " offre" +
        (V.ecartees_non_cdi > 1 ? "s" : "") + " de mes zones écartée" +
        (V.ecartees_non_cdi > 1 ? "s" : "") + " parce qu'elle" +
        (V.ecartees_non_cdi > 1 ? "s ne sont" : " n'est") +
        " pas en CDI (alternance, CDD, intérim, freelance).</p>";
  }

  /* Les salaires des CDI face a mes reperes (question 2 du README). Tout
   * est calcule par generer_site.py, y compris les exclusions ; ici, trois
   * petits tableaux plutot qu'un histogramme, qui demanderait une palette
   * validee par le calcul. */
  function poserSalaires(el) {
    var S = D.salaires;
    if (!S) {
      el.innerHTML = "<p class='vide-message'>Trop peu de salaires comparables pour l'instant.</p>";
      return;
    }
    function tableau(titre, entete, lignes) {
      return "<table class='tableau-salaires'><caption>" + titre + "</caption><thead><tr>" +
        entete.map(function (t) { return "<th>" + t + "</th>"; }).join("") +
        "</tr></thead><tbody>" + lignes.join("") + "</tbody></table>";
    }
    function groupe(g) {
      return "<tr><td>" + echapper(g.nom) + "</td><td>" + g.offres + "</td><td>" +
        (g.mediane == null ? "—" : euros(g.mediane)) + "</td></tr>";
    }
    el.innerHTML =
      "<p class='chiffre-cle'><strong>" + euros(S.mediane) + "</strong> brut par mois : " +
        "le salaire médian des CDI. La moitié des offres se situe entre " +
        euros(S.quart_bas) + " et " + euros(S.quart_haut) + ".</p>" +
      tableau("Où tombent mes repères", ["Repère", "Montant", "Paient au moins"],
        S.reperes.map(function (r) {
          return "<tr><td>" + echapper(r.nom) + "</td><td>" + euros(r.montant) + "</td><td>" +
            r.pct + " % <span class='sous-valeur'>" + r.offres + " sur " + S.retenues + "</span></td></tr>";
        })) +
      tableau("Selon l'expérience demandée", ["Expérience", "Offres", "Médiane"],
        S.par_experience.map(groupe)) +
      tableau("Selon le lieu", ["Lieu", "Offres", "Médiane"], S.par_zone.map(groupe)) +
      "<p class='note-graphe'>" + S.retenues + " salaires comparables : les CDI distincts vus du " +
        formaterDate(S.periode.debut) + " au " + formaterDate(S.periode.fin) + " (" +
        S.cdi_distincts + "), dont " + S.avec_salaire + " affichent un salaire ; " +
        S.temps_partiel + " temps partiel" + (S.temps_partiel > 1 ? "s" : "") + " et " +
        S.incoherentes + " saisie" + (S.incoherentes > 1 ? "s" : "") +
        " incohérente" + (S.incoherentes > 1 ? "s" : "") + " écartés. " +
        "Tout est ramené en brut mensuel sur douze mois.</p>";
  }

  function poserEmployeurs(el) {
    var a = D.acteurs;
    if (!a || !a.classement.length) {
      el.innerHTML = "<p class='vide-message'>Aucune entreprise nommée dans ce relevé.</p>";
      return;
    }
    var combien = Number(el.dataset.combien || a.classement.length);
    var liste = a.classement.slice(0, combien);
    var max = liste[0].offres;
    el.innerHTML = liste.map(function (f) {
      var largeur = Math.round(f.offres * 100 / max);
      var detail = [];
      if (f.lieux > 1) detail.push(f.lieux + " villes");
      if (f.secteur) detail.push(f.secteur);
      return "<div class='ligne-acteur'>" +
        "<span class='nom' title='" + echapper(f.nom) + "'>" + echapper(f.nom) + "</span>" +
        "<span class='barre-piste'><span class='barre-remplie' style='width:" + largeur + "%'></span></span>" +
        "<span class='n'>" + f.offres + "</span>" +
        (detail.length ? "<span class='detail'>" + echapper(detail.join(" · ")) + "</span>" : "<span class='detail'></span>") +
        "</div>";
    }).join("");
  }

  function poserZonesActeurs(el) {
    var a = D.acteurs, miens = D.mes_departements;
    el.innerHTML = Object.keys(miens).map(function (code) {
      var z = (a.mes_zones || {})[code] || { offres: 0, nommees: [], anonymes: 0 };
      var corps;
      if (!z.offres) {
        corps = "<p class='vide-message'>Aucune offre dans ce relevé.</p>";
      } else {
        corps = "<ul class='liste-entreprises'>" +
          z.nommees.map(function (nom) { return "<li>" + echapper(nom) + "</li>"; }).join("") +
          (z.anonymes ? "<li class='anonyme'>" + z.anonymes + " offre" +
            (z.anonymes > 1 ? "s" : "") + " sans employeur nommé</li>" : "") +
          "</ul>";
      }
      return "<div class='zone-acteur'>" +
        "<div class='zone-tete'><strong>" + echapper(miens[code]) + " (" + code + ")</strong>" +
        "<span>" + z.offres + " offre" + (z.offres > 1 ? "s" : "") + "</span></div>" +
        corps + "</div>";
    }).join("");
  }

  function poserSecteurs(el) {
    var secteurs = (D.acteurs || {}).secteurs || [];
    if (!secteurs.length) { el.innerHTML = "<p class='vide-message'>Secteur non renseigné.</p>"; return; }
    var max = secteurs[0][1];
    el.innerHTML = secteurs.map(function (s) {
      return "<div class='barre-ligne large'>" +
        "<span class='lieu' title='" + echapper(s[0]) + "'>" + echapper(s[0]) + "</span>" +
        "<span class='barre-piste'><span class='barre-remplie' style='width:" +
          Math.round(s[1] * 100 / max) + "%'></span></span>" +
        "<span class='n'>" + s[1] + "</span></div>";
    }).join("");
  }

  function poserHorodatage(el) {
    el.className = "horodatage";
    el.textContent = "Relevé du " + formaterDate(D.meta.date);
  }

  // Remplace <span data-valeur="stats.total"></span> par la valeur correspondante.
  function poserValeurs() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-valeur]"), function (el) {
      var valeur = el.dataset.valeur.split(".").reduce(function (objet, cle) {
        return objet == null ? undefined : objet[cle];
      }, D);
      if (valeur !== undefined) el.textContent = valeur;
    });
  }

  function poserPied(el) {
    el.className = "note-pied";
    el.textContent = "Chiffres relevés le " + formaterDate(D.meta.date) +
      " · Hippolyte Tardy, M2 Marketing Opérationnel & Digital, IAE Clermont Auvergne.";
  }

  // ------------------------------------------------------------- lancement

  poserOssature();

  if (!D) {
    var principal = document.querySelector(".principal") || document.body;
    var avertissement = document.createElement("p");
    avertissement.style.color = "var(--alerte)";
    avertissement.textContent = "Données absentes. Lancez : python scripts/traitement/generer_site.py";
    principal.insertBefore(avertissement, principal.firstChild);
    return;
  }

  var constructeurs = {
    "kpis": poserKpis,
    "source": poserSource,
    "carte-france": poserCarteFrance,
    "barres-departements": poserBarresDepartements,
    "barres-contrats": poserBarresContrats,
    "reserves": poserReserves,
    "offres": poserOffres,
    "dernieres-offres": poserDernieresOffres,
    "horodatage": poserHorodatage,
    "identite": poserIdentite,
    "cv": poserCv,
    "bouton-maj": poserBoutonMaj,
    "evolution": poserEvolution,
    "vedette": poserVedette,
    "sommaire-page": poserSommairePage,
    "a-retenir": poserARetenir,
    "mots-metier": poserMotsMetier,
    "salaires": poserSalaires,
    "comparaison-metiers": poserComparaisonMetiers,
    "offres-mes-zones": poserOffresMesZones,
    "employeurs": poserEmployeurs,
    "zones-acteurs": poserZonesActeurs,
    "secteurs": poserSecteurs,
    "outils-demandes": poserOutilsDemandes,
    "outils-manquants": poserOutilsManquants,
    "outils-acquis": poserOutilsAcquis,
    "pied": poserPied
  };

  Object.keys(constructeurs).forEach(function (nom) {
    blocs(nom).forEach(function (el) { constructeurs[nom](el); });
  });

  poserValeurs();
})();
