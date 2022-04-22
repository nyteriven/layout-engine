import { uniqueId } from "lodash";
import * as React from "react";
import styled from "styled-components";

interface LayoutProps {
  label?: string;
  value?: string;
}

interface LayoutNode {
  uid: string;
  component: string;
  props?: LayoutProps;
  children?: LayoutNode[];
}

interface ComponentMap<P> {
  [name: string]: React.FunctionComponent<P> | React.ComponentClass<P>;
}

interface Styleable {
  className?: string;
}

const Section = styled.div`
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;

  > * {
    margin-top: 0.25rem;

    &:first-child {
      margin-top: 0;
    }
  }
`;

const LabelValueBase = ({
  label,
  value,
  className
}: LayoutProps & Styleable) => {
  return (
    <div className={className}>
      <div>{label}</div>
      <div>{value}</div>
    </div>
  );
};

const LabelValue = styled(LabelValueBase)`
  display: flex;
  direction: flex-row;

  > :first-child {
    font-weight: bold;
  }
`;

const Fallback = ({
  children,
  ...props
}: React.PropsWithChildren<LayoutProps>) => {
  return (
    <Section>
      <pre>{JSON.stringify(props, undefined, 2)}</pre>
      <div>{children}</div>
    </Section>
  );
};

const renderUsingMap = <P>(map: ComponentMap<P>) => {
  const render = <P>(tree: LayoutNode) => {
    const { uid, component, props = {}, children = [] } = tree;
    const Component = map[component];
    const componentProps = {
      key: uid,
      ...props,
      children: children.map(render)
    };
    return Component
      ? React.createElement<P>(Component, componentProps)
      : React.createElement<P>(Fallback, componentProps);
  };
  return render;
};

const map = {
  Section,
  LabelValue
};

// type MapProps = {} | Styleable;

const data = {
  uid: uniqueId(),
  component: "Section",
  children: [
    {
      uid: uniqueId(),
      component: "Section",
      children: [
        {
          uid: uniqueId(),
          component: "LabelValue",
          props: {
            label: "First",
            value: "One"
          }
        },
        {
          uid: uniqueId(),
          component: "LabelValue",
          props: {
            label: "Second",
            value: "Two"
          }
        }
      ]
    },
    {
      uid: uniqueId(),
      component: "Section",
      children: [
        {
          uid: uniqueId(),
          component: "LabelValue",
          props: {
            label: "First",
            value: "Alpha"
          }
        },
        {
          uid: uniqueId(),
          component: "LabelValue",
          props: {
            label: "Last",
            value: "Omega"
          }
        }
      ]
    }
  ]
};

export const LayoutDemo = () => {
  return <>{renderUsingMap(map)(data)}</>;
};
