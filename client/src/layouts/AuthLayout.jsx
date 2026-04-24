import React from 'react';
import { Layout, Card, Flex } from 'antd';

const { Content } = Layout;

export default function AuthLayout({ children }){
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#F1F4F9' }}>
      <Content>
        {/* Flex digunakan untuk centering secara horizontal dan vertikal */}
        <Flex 
          justify="center" 
          align="center" 
          style={{ minHeight: '100vh', padding: '16px' }}
        >
          <Card
            bordered={false}
            style={{
              width: '100%',
              maxWidth: 448, // Sama dengan max-w-md (28rem)
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
            styles={{ body: { padding: '32px' } }}
          >
            {children}
          </Card>
        </Flex>
      </Content>
    </Layout>
  );
};