$(document).ready(() => {
  // 3D angle
  $('.three-dee').click(() => {
    $('#pokemon').toggleClass('perspective')
    $('button').toggleClass('active')
    $('.depth').removeAttr('style')
  })
  const handleMouseMove = e => {
    const offset = $('#pokemon').offset()
    const width = $('#pokemon').width()
    const height = $('#pokemon').height()
    const posX = (100 - (((e.pageX - offset.left) / width * 100)) - 50) * 0.15
    const posY = (((e.pageY - offset.top) / height * 100) - 50) * 0.15
    const moving = `rotateX(${posY}deg) rotateY(${posX}deg)`
    $('.depth').css({'-webkit-transform': moving, '-moz-transform': moving, '-ms-transform': moving, '-o-transform': moving, 'transform': moving})
  }
  let enableHandler
  $('#pokemon').mousemove(function(e) {
    if ($(this).hasClass('perspective') && enableHandler) {
      handleMouseMove(e)
      enableHandler = false
    }
  })
  window.setInterval(() => {
    enableHandler = true
  }, 20)

  // Pokédex
  // const pokedex = (dex, level) => {
  //   $.ajax({
  //     'async': false,
  //     'global': false,
  //     'url': "js/pokemon.json",
  //     'dataType': "json",
  //     'success': function (data) {
  //         poke = data
  //     }
  //   })
  //   var stats = new Object()
  //       stats['id'] = poke[dex].id
  //       stats.name = poke[dex].name
  //       stats.hp  = Math.floor((poke[dex].stats.hp * 2 + 193) * level / 100 + 5)
  //       stats['atk'] = Math.floor(((poke[dex].stats.attack * 2 + 193) * level / 100 + 10) * level / 100 + 20)
  //       stats.def = Math.floor((poke[dex].stats.defense * 2 + 193) * level / 100 + 10)
  //       stats['spa'] = Math.floor(((poke[dex].stats.spattack * 2 + 193) * level / 100 + 10) * level / 100)
  //       stats['spd'] = Math.floor((poke[dex].stats.spdefense * 2 + 193) * level / 100 + 10)
  //       stats['spe'] = Math.floor((poke[dex].stats.speed * 2 + 193) * level / 100 + 10)
  //   return stats
  // }

  // Player setup
  const player = 'Dr. Secchi'
  // var playerID = 25
  const playerLevel = 5
  const playerPokemon = {
    'name': 'Mara',
    'hp': 35,
    'atk': 70,
    'def': 30
  }
  const hpPlayerTotal = playerPokemon.hp
  let hpPlayer = hpPlayerTotal
  // var playerBaseAttack = playerPokemon.atk
  // var playerBaseDefense = playerPokemon.def
  $('.player .level').text(playerLevel)
  $('.player .hp').text(hpPlayerTotal)
  $('.player .hpTotal').text(hpPlayerTotal)
  $('.player .name').text(playerPokemon.name.toUpperCase())
  /*   $('#move0').html('TACKLE')*/  
  // $('#move1').html('TAIL WHIP')
  // $('#move2').html('-')
  const trueAnswers = ['HEART', 
                      'DUKE', 
                      '38', 
                      'FUNGI&BACTERIA',
                      'ANTIBIOTICS', 
                      'BLOOD CULTURE', 
                      'AGED MALE', 
                      'POSSIBLY', 
                      'AORTIC', 
                      'RADIOISOTOPE',
                      'STREPTOCOCCHI']



  // MOSSE RANDOM - inizializzazione ************************************************
  var questions1 = ['I.E. is a disease of...', 
                    'Name of the criteria used?', 
                    'Fever has to be bigger than...',
                    'What can cause an I.E.?',
                    'A typical therapy for I.E. is...', 
                    'A typical medical exam made is...', 
                    'Which is the most affected category?', 
                    'Drug addiction cause I.E. ...', 
                    'Which valve does I.E. usually infect?', 
                    'What is injected during PET?', 
                    'Which bacteria commoly cause I.E.?']
  var nquestion = questions1.length
  var questions2 = ['', '', '', '', '', '', '']
  var answers0 = ['Heart',  'Duke',   '37', 'Too much study', 'Ibuprofen',    'Endoscopy',      'AppStat Students', 'Never',    'Aortic',    'Radioisotope', 'All']
  var answers1 = ['Brain',  'Mara',   '43', 'Fungi&Bacteria', 'Paracetamol',  'Blood Culture',  'Aged Male',        'Always',   'Tricuspid',  'Bacteria',     'Spreptococchi']
  var answers2 = ['Arms',   'Brian',  '38', 'Viruses',        'Antibiotics',  'Autopsy',        'Young Female',     'Possibly', 'None',       'Blood',        'None']
  var questionSel = Math.floor(Math.random()*(nquestion))
  console.log(questionSel)
  $('#move0').html(answers0[questionSel])
  $('#move1').html(answers1[questionSel])
  $('#move2').html(answers2[questionSel])
/*   $('.textQ1').text(questions[questionSel])
  $('.textQ2').text('') */
  // ******************************************************************



  // Foe setup
  const foe = 'Blue'
  // var foeID = 133
  const foePokemon = {
    'name': 'Endocarditis',
    'hp': 40,
    'atk': 55,
    'def': 50
  }
  const hpFoeFull = foePokemon.hp
  let hpFoe = hpFoeFull
  let hpFoeLast = hpFoe
  // var foeBaseAttack = foePokemon.atk
  let foeBaseDefense = foePokemon.def
  $('.foe .level').text(playerLevel)
  $('.foe .name').text(foePokemon.name.toUpperCase())

  // Hide all menus except dialog
  const hider = () => {
    $('.window.menu').hide()
    $('.window.item').hide()
    $('.window.pkmn').hide()
    $('.window.fight').hide()
    $('.questionTexts').hide() // scompare box domande
  }

  // Reset to battle ready mode for turn or cancel
  const reset = () => {
    $('.text1').text('')
    $('.text2').text('')
    $('.window.item').hide()
    $('.window.pkmn').hide()
    $('.window.fight').hide()
    $('.window.menu').show()
    $('.questionTexts').show() // ogni volta che appare il menu, compare anche il box domande
    
    /* $('.textQ1').text('Porno coi nani')
    $('.textQ2').text('Gay!')
    typer() */
  }

  // Health bar width calculation and health numbers
  const healthbar = (current, total) => {
    const hpCurrent = current
    const hpTotal = total
    const percentTotal = 100
    const percentCurrent = hpCurrent * percentTotal / hpTotal
    return percentCurrent
  }

  // Enemy turn
  const attackEnd = () => {
    if (hpFoe <= 0) {
      $('.window.menu').hide()
      $('.foe .hp-bar-active').css('width', '0%')
      window.setTimeout( () => {
        $('.foe .images').delay(500).animate({
          bottom: '-35em'
        }, 1000)
        $('.text1').text(`${foePokemon.name.toUpperCase()} fainted!`)
        $('.text2').text('')
        typer()
        window.setTimeout( () => {
          $('.foe .stats').hide()
          //$('.text1').text(`Got $${Math.floor(playerLevel * 2.5)} for`)
          $('.text1').text(`Got 30L for`)
          $('.text2').text('winning!')
          typer()
          $('.window.menu').hide() // non so perchè ma serve
          window.setTimeout( () => {
            $('.window.menu').hide() // non so perchè ma serve
            $('.text1').text(`${foe.toUpperCase()}: I can't`)
            $('.text2').text('believe it!')
            typer()
            window.setTimeout( () => {
              $('.text1').text('I chose the')
              $('.text2').text('wrong disease!')
              typer()
            }, 2000)
          }, 2000)
        }, 2000)
      }, 2000)
    } else {
      window.setTimeout( () => {
        $('.text1').text(`${foePokemon.name.toUpperCase()} used`)
        /* $('.text2').text('TACKLE!') */
        $('.text2').text(['FEVER', 'EMBOLISM', 'DYSPNEA', 'COUGH'][Math.floor(Math.random() * 3)])
        typer()
        $('.foe .images').animate({
          right: '0em'
        }, 100, 'linear').animate({
          right: '1.8em'
        }, 50, 'linear').delay(100).animate({
          right: '0.8em'
        }, 10, 'linear')
        window.setTimeout( () => {
          $('.player .images').css('opacity', 0)
          window.setTimeout( () => {
            $('.player .images').css('opacity', 1)
            window.setTimeout( () => {
              $('.player .images').css('opacity', 0)
              window.setTimeout( () => {
                $('.player .images').css('opacity', 1)
                window.setTimeout( () => {
                  $('.player .images').css('opacity', 0)
                  window.setTimeout( () => {
                    $('.player .images').css('opacity', 1)
                    window.setTimeout( () => {
                      const basePower = 40
                      const baseDamage = Math.floor(Math.floor(Math.floor(2 * playerLevel / 5 + 2) * basePower * foePokemon.atk / playerPokemon.def) / 50) + 2
                      hpPlayer -= baseDamage
                      if (hpPlayer <= 0) {
                        $('.window.menu').hide()
                        $('.player .hp').text('0')
                        $('.player .hp-bar-active').css('width', '0%')
                        $('.player .stats').hide()
                        window.setTimeout( () => {
                          $('.player .images').delay(500).animate({
                            bottom: '-35.714em'
                          }, 1000)
                          $('.text1').text(`${playerPokemon.name.toUpperCase()} fainted...`)
                          $('.text2').text('')
                          typer()
                          window.setTimeout( () => {
                            $('.text1').text(`${player.toUpperCase()} is out of usable POKéMON`)
                            //$('.text2').text('useable POKéMON...')
                            $('.text2').text('')
                            typer()
                            window.setTimeout( () => {
                              $('.text1').text(`${player.toUpperCase()} whited out!`)
                              $('.text2').text('')
                              typer()
                            }, 2000)
                          }, 2000)
                        }, 2000)
                      } else {
                        $('.window.menu').hide() // non so perchè ma serve
                        if (hpFoeLast != hpFoe){
                          questionSel = Math.floor(Math.random()*(nquestion))           // provo per random question
                        }
                        hpFoeLast = hpFoe

                        $('#move0').html(answers0[questionSel])
                        $('#move1').html(answers1[questionSel])
                        $('#move2').html(answers2[questionSel])
                        $('.player .hp').text(hpPlayer)
                        $('.player .hp-bar-active').animate({
                          width: `${healthbar(hpPlayer, hpPlayerTotal)}%`
                        }, 500)
                        window.setTimeout( () => {
                          reset()
                          $('.textQ1').text(questions1[questionSel])
                          $('.textQ2').text(questions2[questionSel])
                          /* $('.textQ1').text(`${questions1.toUpperCase()}`) // prova 
                          $('.textQ2').text('Gay!') // prova */
                          typer() // prova
                        }, 2400)
                      }
                    }, 100)
                  }, 100)
                }, 100)
              }, 100)
            }, 100)
          }, 100)
        }, 100)
      }, 2000)
    }
  }

  // Growl
  const growl = () => {
    hider()
    $('.text1').text(playerPokemon.name.toUpperCase())
    $('.text2').text('used GROWL!')
    typer()
    window.setTimeout( () => {
      if (foeBaseDefense < foePokemon.def - 20) {
        $('.text1').text(`${foePokemon.name.toUpperCase()}'s defense`)
        $('.text2').text('can\'t drop lower!')
        typer()
        window.setTimeout( () => {
          attackEnd()
        }, 2000)
      } else {
        $('.text1').text(`${foePokemon.name.toUpperCase()}'s defense`)
        $('.text2').text('dropped by 2!')
        foeBaseDefense =- 2
        typer()
        window.setTimeout( () => {
          attackEnd()
        }, 2000)
      }
    }, 2000)
  }

  const attack = moveName => {
    hider()
    $('.text1').text(`${playerPokemon.name.toUpperCase()} used`)
    $('.text2').text(`${moveName.toUpperCase()}!`)
    typer()
    $('.player .images').animate({
      left: '0em'
    }, 100, 'linear').animate({
      left: '1.8em'
    }, 50, 'linear').delay(100).animate({
      left: '0.8em'
    }, 10, 'linear')
    window.setTimeout( () => {
      $('.foe .images').css('opacity', 0)
      window.setTimeout( () => {
        $('.foe .images').css('opacity', 1)
        window.setTimeout( () => {
          $('.foe .images').css('opacity', 0)
          window.setTimeout( () => {
            $('.foe .images').css('opacity', 1)
            window.setTimeout( () => {
              $('.foe .images').css('opacity', 0)
              window.setTimeout( () => {
                $('.foe .images').css('opacity', 1)
                const basePower = 40
                const baseDamage = Math.floor(Math.floor(Math.floor(2 * playerLevel / 5 + 2) * basePower * playerPokemon.atk / foePokemon.def) / 50) + 2
                hpFoe -= (trueAnswers.includes(`${moveName.toUpperCase()}`)) ? baseDamage : 0
                $('.foe .hp-bar-active').animate({
                  width: `${healthbar(hpFoe, hpFoeFull)}%`
                }, 500)
                window.setTimeout( () => {
                  if(trueAnswers.includes(`${moveName.toUpperCase()}`)==false) {
                    $('.text1').text(`Oh no! ${moveName.toUpperCase()} is wrong!`)
                    $('.text2').text('')
                    typer()
                  }
                }, 500)
                attackEnd()
              }, 100)
            }, 100)
          }, 100)
        }, 100)
      }, 100)
    }, 100)
  }

  // Use potion
  const potion = potionType => {
    let strength
    hider()
    if (potionType === 'normal') {
      strength = 20
    } else if (potionType === 'super') {
      strength = 50
    } else if (potionType === 'hyper') {
      strength = 200
    } else {
      strength = 999
    }
    if (hpPlayer >= hpPlayerTotal) {
      $('.text1').text('HP already')
      $('.text2').text('full!')
      typer()
      window.setTimeout( () => {
        reset()
        $('.textQ1').text(questions1[questionSel])
        $('.textQ2').text(questions2[questionSel])
        typer()
      }, 1000)
    } else {
      $('.text1').text('Used ANTIBIOTIC!')
      $('.text2').text('')
      typer()
      hpPlayer += strength
      if (hpPlayer >= hpPlayerTotal) {
        hpPlayer = hpPlayerTotal
      }
      $('.player .hp').text(hpPlayer)
      $('.player .hp-bar-active').animate({
        width: `${healthbar(hpPlayer, hpPlayerTotal)}%`
      }, 500)
      potionCount--
      attackEnd()
    }
    $('.potionCount').text(potionCount)
    if (potionCount <= 0) {
      $('.potion').hide()
    }
  }

  // Animated typing of text
  var typer = () => {
    let line
    $('.text1, .text2, .textQ1, .textQ2').each(function() {
      $(this).text($(this).text().replace(new RegExp(' ', 'g'), ' '))
    })
    line = $('.text1, .text2, .textQ1, .textQ2')
    line.hide().contents().each(function() {
      let letters
      letters = void 0
      letters = `<span> ${this.data.split('').join(' </span><span> ')} </span>`
      $(this).replaceWith(letters)
    })
    line.find('span').hide().each(function() {
      if (!$.trim(this.innerHTML)) {
        $(this).remove()
      }
    })
    line.show().find('span').each(function(i) {
      $(this).delay(40 * i).fadeIn(0)
    })
  }

  // Click elements
  var potionCount = 3
  $('.potionCount').text(potionCount)
  $('.button.item').click(() => {
    $('.window.item').show()
    $('.window.menu').hide()
  })
  $('.button.potion').click(() => {
    potion('normal')
  })
  $('.button.fight').click(() => {
    $('.window.fight').show()
  })
  $('.button.growl').click(() => {
    growl()
  })
  $('.button#move0').click(() => {
    var answer = answers0[questionSel]
    attack(answer)
  })
  $('.button#move1').click(() => {
    var answer = answers1[questionSel]
    attack(answer)
  })
  $('.button#move2').click(() => {
    var answer = answers2[questionSel]
    attack(answer)
  })
  $('.button.back').click(() => {
    reset()
  })
  $('.button.pkmn').click(() => {
    /* $('.window.pkmn').show() */
    hider()
    $('.text1').text('You have to fight')
    $('.text2').text('alone this match!')
    typer()
    window.setTimeout( () => {
      reset()
      $('.textQ1').text(questions1[questionSel])
      $('.textQ2').text(questions2[questionSel])
      typer()
    }, 3000)
  })
  $('.button.run').click(() => {
    hider()
    $('.text1').text('No! There\'s no')
    $('.text2').text('running from an')
    typer()
    window.setTimeout( () => {
      //$('.text1').text('trainer battle!')
      $('.text1').text('Endocarditis!')
      $('.text2').text('')
      typer()
      window.setTimeout( () => {
        reset()
        $('.textQ1').text(questions1[questionSel])
        $('.textQ2').text(questions2[questionSel])
        typer()
      }, 2000)
    }, 2000)
  })

  // Start animation
  const playPokemon = () => {
    hider()
    $('.foe .images').css('right', '16em')
    $('.player .images').css('left', '16em')
    $('.player .pokemon, .foe .pokemon, .stats, .balls, .window.item, .window.pkmn, .window.fight, .window.menu').hide()
    window.setTimeout(() => {
      $('.foe .images').animate({
        right: '0.8em'
      }, 800, 'linear')
      $('.player .images').animate({
        left: '0.8em'
      }, 800, 'linear')
      window.setTimeout(() => {
        $('.trainer, .balls').show()
        window.setTimeout(() => {
          $('.text1').text(`${foe.toUpperCase()} wants`)
          $('.text2').text('to fight!')
          typer()
          window.setTimeout(() => {
            $('.balls').hide()
            $('.foe .images').animate({
              right: '-21em'
            }, 400, 'linear')
            window.setTimeout(() => {
              $('.text1').text(`${foe.toUpperCase()} sent`)
              $('.text2').text(`out ${foePokemon.name.toUpperCase()}!`)
              typer()
              $('.foe .pokemon').show()
              $('.foe .trainer').hide()
              $('.foe .images').animate({
                right: '0.8em'
              }, 700, 'linear')
              window.setTimeout(() => {
                $('.foe .stats').show()
                $('.player .images').animate({
                  left: '-21em'
                }, 400, 'linear')
                window.setTimeout(() => {
                  $('.player .trainer').hide()
                  $('.player .pokemon').show()
                  $('.player .images').animate({
                    left: '0.8em'
                  }, 700, 'linear')
                  $('.text1').text(`Go! ${playerPokemon.name.toUpperCase()}!`)
                  $('.text2').text('')
                  typer()
                  $('.player .stats').show()
                  window.setTimeout(() => {
                    reset()
                    $('.textQ1').text(questions1[questionSel])
                    $('.textQ2').text(questions2[questionSel])
                    typer()
                  }, 2000)
                }, 800)
              }, 1500)
            }, 1000)
          }, 2500)
        }, 400)
      }, 800)
    }, 600)
  }

  // Start
  playPokemon()
})
