$(document).ready(function() {
    $("body").on("click", ".js-gotop", function() {
        $('html, body').animate({scrollTop: 0}, 'fast');
    });

    $('th').click(function(){
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc){rows = rows.reverse()}
        for (var i = 0; i < rows.length; i++){table.append(rows[i])}
    })
    function comparer(index) {
        return function(a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index){ return $(row).children('td').eq(index).text() }








    // Pokedex  --------------------------------------------------------------------------------------------------------
    let pokedexShowOnlyFinalStages = false;
    let pokedexShowOnlyFirstStages = false;
    let pokedexMustBeType1 = '*';
    let pokedexMustBeType2 = '*';
    let pokedexMustHaveAbility = '*';
    let pokedexSearch = '';
    $(".pokedexsettings").on("change", ".js-showonlyfinal", function() {
        if ($(this).is(':checked')) {
            pokedexShowOnlyFinalStages = true;
        } else {
            pokedexShowOnlyFinalStages = false;
        }
        updatePokedexTable();
    });
    $(".pokedexsettings").on("change", ".js-showonlyfirst", function() {
        if ($(this).is(':checked')) {
            pokedexShowOnlyFirstStages = true;
        } else {
            pokedexShowOnlyFirstStages = false;
        }
        updatePokedexTable();
    });
    $(".pokedexsettings").on("change", ".js-showonlytype1", function() {
        pokedexMustBeType1 = $(".js-showonlytype1").val();
        updatePokedexTable();
    });
    $(".pokedexsettings").on("change", ".js-showonlytype2", function() {
        pokedexMustBeType2 = $(".js-showonlytype2").val();
        updatePokedexTable();
    });
    $(".pokedexsettings").on("change", ".js-showonlyability", function() {
        pokedexMustHaveAbility = $(".js-showonlyability").val();
        updatePokedexTable();
    });
    $(".pokedexsettings").on("input", ".js-pokedexsearch", function() {
        pokedexSearch = $(".js-pokedexsearch").val().toLowerCase();
        updatePokedexTable();
    });
    function updatePokedexTable() {
        $(".pokedex table tbody tr").each(function(index) {
            let showThisRow = true;
            if(!$(this).data("pokedexmon-isfinal") && pokedexShowOnlyFinalStages) {
                showThisRow = false;
            }
            if(!$(this).data("pokedexmon-isfirst") && pokedexShowOnlyFirstStages) {
                showThisRow = false;
            }
            if(pokedexMustBeType1 != "*" && (pokedexMustBeType1 != $(this).data("pokedexmon-type1") && pokedexMustBeType1 != $(this).data("pokedexmon-type2"))) {
                showThisRow = false;
            }
            if(pokedexMustBeType2 != "*" && (pokedexMustBeType2 != $(this).data("pokedexmon-type1") && pokedexMustBeType2 != $(this).data("pokedexmon-type2"))) {
                showThisRow = false;
            }
            if(pokedexMustHaveAbility != "*" && (pokedexMustHaveAbility != $(this).data("pokedexmon-ability1") && pokedexMustHaveAbility != $(this).data("pokedexmon-ability2"))) {
                showThisRow = false;
            }
            if(!$(this).data("pokedexmon-name").includes(pokedexSearch)) {
                showThisRow = false;
            }

            if(showThisRow) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        $('.js-pokedexresult-total').text($('.pokedex table tbody tr:visible').length);
    }
    //------------------------------------------------------------------------------------------------------------------



    // Trainers --------------------------------------------------------------------------------------------------------
    $(".trainersettings").on("change", ".js-showhighestlevels", function() {
        if ($(this).is(':checked')) {
            showHighestLevels();
        } else {
            hideHighestLevels();
        }
    });
    $(".trainersettings").on("change", ".js-openalltrainers", function() {
        if ($(this).is(':checked')) {
            openAllTrainers();
        } else {
            closeAllTrainers();
        }
    });
    $(".trainersettings").on("change", ".js-openallmoves", function() {
        if ($(this).is(':checked')) {
            openAllMoves();
        } else {
            closeAllMoves();
        }
    });
    $(".trainercontainer").on("click", ".js-opentrainer", function() {
        openTrainer($(this).data('trainer'));
    });
    $(".trainercontainer").on("click", ".js-closetrainer", function() {
        closeTrainer($(this).data('trainer'));
    });
    $(".trainercontainer").on("click", ".js-openmoves", function() {
        openTrainerMoves($(this).data('trainer'));
    });
    $(".trainercontainer").on("click", ".js-closemoves", function() {
        closeTrainerMoves($(this).data('trainer'));
    });
    function showHighestLevels() {
        $('.js-trainerlevel').show();
    }
    function hideHighestLevels() {
        $('.js-trainerlevel').hide();
    }
    function openAllTrainers() {
        $('.trainercontainer__pokemons').show();
        $('.trainercontainer__footer').show();
        $('.js-opentrainer').hide();
        $('.js-closetrainer').show();
    }
    function closeAllTrainers() {
        $('.trainercontainer__pokemons').hide();
        $('.trainercontainer__footer').hide();
        $('.js-opentrainer').show();
        $('.js-closetrainer').hide();
    }
    function openAllMoves() {
        $('.trainerpokemon__moves').show();
        $('.js-openmoves').hide();
        $('.js-closemoves').show();
    }
    function closeAllMoves() {
        $('.trainerpokemon__moves').hide();
        $('.js-openmoves').show();
        $('.js-closemoves').hide();
    }
    function openTrainer(trainerID) {
        $('.trainercontainer__pokemons[data-trainer="' + trainerID + '"]').show();
        $('.trainercontainer__footer[data-trainer="' + trainerID + '"]').show();
        $('.js-opentrainer[data-trainer="' + trainerID + '"]').hide();
        $('.js-closetrainer[data-trainer="' + trainerID + '"]').show();
    }
    function closeTrainer(trainerID) {
        $('.trainercontainer__pokemons[data-trainer="' + trainerID + '"]').hide();
        $('.trainercontainer__footer[data-trainer="' + trainerID + '"]').hide();
        $('.js-opentrainer[data-trainer="' + trainerID + '"]').show();
        $('.js-closetrainer[data-trainer="' + trainerID + '"]').hide();
    }
    function openTrainerMoves(trainerID) {
        $('.trainerpokemon__moves[data-trainer="' + trainerID + '"]').show();
        $('.js-openmoves[data-trainer="' + trainerID + '"]').hide();
        $('.js-closemoves[data-trainer="' + trainerID + '"]').show();
    }
    function closeTrainerMoves(trainerID) {
        $('.trainerpokemon__moves[data-trainer="' + trainerID + '"]').hide();
        $('.js-openmoves[data-trainer="' + trainerID + '"]').show();
        $('.js-closemoves[data-trainer="' + trainerID + '"]').hide();
    }
    //------------------------------------------------------------------------------------------------------------------





    // Move page  -------------------------------------------------------------------------------------------------------
    let movepageMustBeType = '*';
    let movepageMustBeCompatible = true;
    $(".canlearn_settings").on("change", ".js-showonlytype", function() {
        movepageMustBeType = $(".js-showonlytype").val();
        updateMovepageTable();
    });
    $(".canlearn_settings").on("change", ".js-showonlycompatibility", function() {
        movepageMustBeCompatible = $(".js-showonlycompatibility").val();
        updateMovepageTable();
    });
    function updateMovepageTable() {
        $(".canlearn_list table tbody tr").each(function(index) {
            let showThisRow = true;
            if(movepageMustBeType != "*" && (movepageMustBeType != $(this).data("typemon-type1") && movepageMustBeType != $(this).data("typemon-type2"))) {
                showThisRow = false;
            }
            if(movepageMustBeCompatible != "*" && (movepageMustBeCompatible == "level" && !$(this).data("typemon-levelup")) || (movepageMustBeCompatible == "learn" && (!$(this).data("typemon-levelup") && !$(this).data("typemon-tm")))) {
                showThisRow = false;
            }

            if(showThisRow) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    //------------------------------------------------------------------------------------------------------------------
    




    // Moves page  ------------------------------------------------------------------------------------------------------
    let movespageMustBeType = '*';
    let movespageMustBeCategory = '*';
    let movespageSearch = '';
    $(".moves__filters").on("change", ".js-showonlytype", function() {
        movespageMustBeType = $(".js-showonlytype").val();
        updateMovespageTable();
    });
    $(".moves__filters").on("change", ".js-showonlycategory", function() {
        movespageMustBeCategory = $(".js-showonlycategory").val();
        updateMovespageTable();
    });
    $(".moves__filters").on("input", ".js-movessearch", function() {
        movespageSearch = $(".js-movessearch").val().toLowerCase();;
        updateMovespageTable();
    });
    function updateMovespageTable() {
        $(".movestable tbody tr").each(function(index) {
            let showThisRow = true;
            if(movespageMustBeType != "*" && movespageMustBeType != $(this).data("moves-type")) {
                showThisRow = false;
            }
            if((movespageMustBeCategory != "*" && movespageMustBeCategory != "notStatus" && (movespageMustBeCategory != $(this).data("moves-category")) || (movespageMustBeCategory == "notStatus" && $(this).data("moves-category") != "Special" && $(this).data("moves-category") != "Physical"))) {
                showThisRow = false;
            }
            if(!$(this).data("moves-name").includes(movespageSearch)) {
                showThisRow = false;
            }

            if(showThisRow) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        $('.js-movesresults-total').text($('.movestable tbody tr:visible').length);
        recolorMovespageTable();
    }
    function recolorMovespageTable() {
        $(".movestable tbody tr:visible").each(function(index) {
            if(index % 2 > 0) {
                $(this).css("background-color", "#d2f9e0");
            } else {
                $(this).css("background-color", "transparent");
            }
        });
    }
    //------------------------------------------------------------------------------------------------------------------
    




    // Items page  ------------------------------------------------------------------------------------------------------
    let itemspageMustBeCategory = '*';
    let itemspageSearch = '';
    $(".items__filters").on("change", ".js-showonlycategory", function() {
        itemspageMustBeCategory = $(".js-showonlycategory").val();
        updateItemspageTable();
    });
    $(".items__filters").on("input", ".js-itemssearch", function() {
        itemspageSearch = $(".js-itemssearch").val().toLowerCase();;
        updateItemspageTable();
    });
    function updateItemspageTable() {
        $(".itemstable tbody tr").each(function(index) {
            let showThisRow = true;
            if(itemspageMustBeCategory != "*" && $(this).data(itemspageMustBeCategory) != true) {
                showThisRow = false;
            }
            if(!$(this).data("items-name").includes(itemspageSearch)) {
                showThisRow = false;
            }

            if(showThisRow) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    //------------------------------------------------------------------------------------------------------------------
});
