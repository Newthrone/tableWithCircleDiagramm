<template>
  <div class="diagramms">
    <h2 class="diagrammsText">Диаграмма</h2>
    <ul class="diagrammsLegend">
      <li v-for="(precent, text) of ageDistribution"
          class="diagrammsLegendItem"
          :key="text">
        {{`${text} - ${precent}%`}}
      </li>
    </ul>
    <section class="diagrammHolder">
      <h3>Диграмма с помощью конусного градиента</h3>
      <div class="diagrammGradient" :style="{background: bgGradient}">
        <span class="diagrammGradientText">doesn't work in ie and firefox</span>
      </div>
    </section>
   <section class="diagrammHolder">
     <h3>Диграмма с помощью svg</h3>
      <svg width="300" height="300" viewBox="0 0 50 50">
        <circle class="chartSector"
                v-for="idx in agesDistributionDegrees.length"
                :style="{ strokeDasharray: chartStylesStrokeDasharray[idx - 1],
                          strokeDashoffset: chartStylesStrokeDashOffset[idx - 1] }"
                r="15.9"
                cx="50%"
                cy="50%"
                :key="idx">
        </circle>
      </svg>
   </section>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
  data() {
    return {
      ageDistribution: {
        'Процент пользователей младше 20 лет': 0,
        'Процент пользователей от 21 до 30 лет': 0,
        'Процент пользователей от 31 до 40 лет': 0,
        'Процент пользователей от 41 до 50 лет': 0,
        'Процент пользователей старше 50 лет': 0,
      },
      chartStylesStrokeDasharray: [],
      chartStylesStrokeDashOffset: []
    }
  },
  computed: {
    agesDistributionDegrees() {
      return this.$store.getters.GET_AGE_DISTRIBUTION_IN_DEGREES
    },
    bgGradient() {
      let acc;
      let degrees = this.agesDistributionDegrees.map((currentDegrees, idx) => {
        if (idx === 0) { return acc = currentDegrees * 3.6 }
        acc += currentDegrees * 3.6
        return acc
      })
      return `conic-gradient(#86cfa3 ${degrees[0]}deg, #a2c6e0 ${degrees[0]}deg ${degrees[1]}deg, #ffc7ec ${degrees[1]}deg ${degrees[2]}deg, #f1f0a5 ${degrees[2]}deg ${degrees[3]}deg, #836bdd ${degrees[3]}deg)`
    }
  },
  methods: {
    updateStyles() {
      let offset = 0
      if (this.chartStylesStrokeDasharray.length !== 0) {
        this.chartStylesStrokeDasharray.length = 0
        this.chartStylesStrokeDashOffset.length = 0
      }
      this.agesDistributionDegrees.forEach((percent) => {
        this.chartStylesStrokeDasharray.push(`${percent} 100`)
        this.chartStylesStrokeDashOffset.push(offset)
        offset -= percent
      })
    },
    updateageDistribution() {
      Object.keys(this.ageDistribution).forEach((key, idx) => {
        this.ageDistribution[key] = this.agesDistributionDegrees[idx]
      })
    }
  },
  beforeMount() {
    this.updateageDistribution()
    this.updateStyles()
  },
  beforeUpdate() {
    this.updateageDistribution()
    this.updateStyles()
  }
}
</script>

<style lang="scss">
  .diagramms {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
  }

  .diagrammsText {
    width: 100%;
  }

  .diagrammsLegend {
    width: 100%;
    padding: 0;
    margin: 2rem 0;
    text-align: start;
  }

  .diagrammsLegendItem {
    position: relative;
    list-style: none;
    margin: 0 0 10px 35%;

     &:before {
      position: absolute;
      left: -1.5em;
      top: 0;
      display: block;
      content: '';
      width: 1em;
      height: 1em;
      border-radius: 2px;
    }

      &:nth-child(1) {

        &:before {
          background-color: #86cfa3;
        }

      }

      &:nth-child(2) {

        &:before {
          background-color: #a2c6e0;
        }

      }

      &:nth-child(3) {

        &:before {
          background-color: #ffc7ec;
        }

      }

      &:nth-child(4) {

        &:before {
          background-color: #f1f0a5;
        }

      }

      &:nth-child(5) {

        &:before {
          background-color: #836bdd;
        }

      }

  }

  .diagrammHolder {
    display: inline-block;
    margin: 2rem;
  }

  .diagrammGradient {
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 50%;
  }

  .diagrammGradientText {
    z-index: -1;
    position: absolute;
    top: 40%;
    left: 50px;
  }

  .chartSector {
    fill: none;
    stroke-width: 10;
    transform-origin: center;
    transform: rotate(-90deg);
    transition: stroke-width 1s;

    &:hover {
      stroke-width: 12;
    }

  }

  .chartSector {

    &:nth-child(1) {
      stroke: #86cfa3;
    }

    &:nth-child(2) {
      stroke: #a2c6e0;
    }

    &:nth-child(3) {
      stroke: #ffc7ec;
    }

    &:nth-child(4) {
      stroke: #f1f0a5;
    }

    &:nth-child(5) {
      stroke: #836bdd;
    }

  }

</style>
