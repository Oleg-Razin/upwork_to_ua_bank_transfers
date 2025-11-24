import Container from "../components/Container";
import Section from "../components/Section";
import Calc from "./Calc";

const CalculatorSection = () => {
  return (
    <Section background="primary" padding="lg">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Розрахуйте ваш дохід
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Використовуйте наш калькулятор для точного розрахунку суми, 
            яку ви отримаєте після всіх комісій та зборів.
          </p>
        </div>
        <Calc />
      </Container>
    </Section>
  );
};

export default CalculatorSection;