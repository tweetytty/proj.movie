package com.sm.movieinfo.util.props;

import java.io.IOException;	
import java.io.InputStream;
import java.util.Collection;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.Vector;

import org.apache.commons.collections.ExtendedProperties;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanDefinitionStoreException;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.MessageSource;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.util.Assert;

import com.sm.movieinfo.common.exception.CoreException;

public class PropertyServiceImpl implements PropertyService,
        ApplicationContextAware, InitializingBean, DisposableBean,
        ResourceLoaderAware {

    private ExtendedProperties extendedProperties = null;
    private ResourceLoader resourceLoader = null;

    private MessageSource messageSource;
    @SuppressWarnings("rawtypes")
    private Set extFileName;
    private Map<String, String> properties;

    protected Log logger = LogFactory.getLog(this.getClass());

    /**
     * boolean 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @return boolean 타입의 값
     */
    public boolean getBoolean(String name) {
        return getConfiguration().getBoolean(name);
    }

    /**
     * boolean 타입의 프로퍼티 값 얻기(디폴트값을 입력받음)
     * 
     * @param name
     *            프로퍼티키
     * @param def
     *            디폴트 값
     * @return boolean 타입의 값
     */
    public boolean getBoolean(String name, boolean def) {
        return getConfiguration().getBoolean(name, def);
    }

    /**
     * double 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @return double 타입의 값
     */
    public double getDouble(String name) {
        return getConfiguration().getDouble(name);
    }

    /**
     * double 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @param def
     *            디폴트 값
     * @return double 타입의 값
     */
    public double getDouble(String name, double def) {
        return getConfiguration().getDouble(name, def);
    }

    /**
     * float 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @return Float 타입의 값
     */
    public float getFloat(String name) {
        return getConfiguration().getFloat(name);
    }

    /**
     * float 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @param def
     *            디폴트 값
     * @return float 타입의 값
     */
    public float getFloat(String name, float def) {
        return getConfiguration().getFloat(name, def);
    }

    /**
     * int 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @return int 타입의 값
     */
    public int getInt(String name) {
        return getConfiguration().getInt(name);
    }

    /**
     * int 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @param def
     *            디폴트 값
     * @return int 타입의 값
     */
    public int getInt(String name, int def) {
        return getConfiguration().getInt(name, def);
    }

    /**
     * 프로퍼티 키 목록 읽기
     * 
     * @return Key를 위한 Iterator
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public Iterator getKeys() {
        return getConfiguration().getKeys();
    }

    /**
     * prefix를 이용한 키 목록 읽기
     * 
     * @param prefix
     *            prefix
     * @return prefix에 매칭되는 키목록
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public Iterator getKeys(String prefix) {
        // getConfiguration().values();
        return getConfiguration().getKeys(prefix);
    }

    /**
     * long 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @return long 타입의 값
     */
    public long getLong(String name) {
        return getConfiguration().getLong(name);
    }

    /**
     * long 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @param def
     *            디폴트 값
     * @return long 타입의 값
     */
    public long getLong(String name, long def) {
        return getConfiguration().getLong(name, def);
    }

    /**
     * String 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @return String 타입의 값
     */
    public String getString(String name) {
        return getConfiguration().getString(name);
    }

    /**
     * String 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @param def
     *            디폴트 값
     * @return String 타입의 값
     */
    public String getString(String name, String def) {
        return getConfiguration().getString(name, def);
    }

    /**
     * String[] 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @return String[] 타입의 값
     */
    public String[] getStringArray(String name) {
        return getConfiguration().getStringArray(name);
    }

    /**
     * Vector 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @return Vector 타입의 값
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public Vector getVector(String name) {
        return getConfiguration().getVector(name);
    }

    /**
     * Vector 타입의 프로퍼티 값 얻기
     * 
     * @param name
     *            프로퍼티키
     * @param def
     *            디폴트 값
     * @return Vector 타입의 값
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public Vector getVector(String name, Vector def) {
        return getConfiguration().getVector(name, def);
    }

    /**
     * 전체 키/값 쌍 얻기
     * 
     * @return Vector 타입의 값
     */
    @SuppressWarnings("unchecked")
    public Collection<String> getAllKeyValue() {
        return getConfiguration().values();
    }

    /**
     * egovProperties 얻기
     * 
     * @return Properties of requested Service.
     */
    private ExtendedProperties getConfiguration() {
        return extendedProperties;
    }

    /**
     * resource 변경시 refresh
     */
    @SuppressWarnings("rawtypes")
    public void refreshPropertyFiles() throws CoreException {

        String fileName = null;

        try {

            Iterator it = extFileName.iterator();

            while (it != null && it.hasNext()) {
                // Get element
                Object element = it.next();
                String enc = null;

                if (element instanceof Map) {
                    Map ele = (Map) element;
                    enc = (String) ele.get("encoding");
                    fileName = (String) ele.get("filename");
                } else {
                    fileName = (String) element;
                }
                loadPropertyResources(fileName, enc);
            }

        } catch (Exception e) {
            if (PropertyService.LOGGER.isErrorEnabled()) {
                PropertyService.LOGGER.error(messageSource.getMessage(
                        "error.properties.refresh.files",
                        new String[] { fileName }, Locale.getDefault()));
                PropertyService.LOGGER.error(messageSource.getMessage(
                        "error.properties.refresh.files.reason",
                        new String[] {}, Locale.getDefault()));
            }
            throw new CoreException("error.properties.refresh.files",
                    new String[] { fileName }, e);

        }
    }

    /**
     * Bean 초기화 함수로 최초 생성시 필요한 Property 세티처리
     * 
     * @throws Exception
     *             fail to initialize
     */
    @SuppressWarnings("unchecked")
    public void afterPropertiesSet() throws CoreException {
        try {

            extendedProperties = new ExtendedProperties();

            // 외부파일이 정의되었을때
            if (extFileName != null) {
                refreshPropertyFiles();
            }

            Iterator<Map.Entry<String, String>> it = properties.entrySet()
                    .iterator();
            while (it.hasNext()) {
                Map.Entry<String, String> entry = it.next();
                String key = entry.getKey();
                String value = entry.getValue();

                if (PropertyService.LOGGER.isDebugEnabled()) {
                    PropertyService.LOGGER.debug(messageSource.getMessage(
                            "debug.properties.property", new String[] { key,
                                    value }, Locale.getDefault()));
                }

                if (key == null || key.equals("")) {
                    if (PropertyService.LOGGER.isErrorEnabled())
                        PropertyService.LOGGER.error(messageSource.getMessage(
                                "error.properties.check.essential",
                                new String[] {}, Locale.getDefault()));
                    throw new CoreException(messageSource,
                            "error.properties.check.essential", null);
                }

                extendedProperties.put(key, value);
            }

        } catch (Exception e) {
            if (e instanceof CoreException)
                throw (CoreException) e;
            else {
                if (PropertyService.LOGGER.isErrorEnabled())
                    PropertyService.LOGGER.error(messageSource.getMessage(
                            "error.properties.initialize.reason",
                            new String[] {}, Locale.getDefault()));
                throw new CoreException(messageSource,
                        "error.properties.initialize", e);
            }
        }
    }

    /**
     * extFileName을 지정할 때 Attribute로 정의
     * 
     * @param extFileName
     */
    @SuppressWarnings("rawtypes")
    public void setExtFileName(Set extFileName) {
        this.extFileName = extFileName;
    }

    /**
     * properties를 지정할 때 Attribute로 정의
     * 
     * @param properties
     */
    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }

    /**
     * 서비스 종료처리
     */
    public void destroy() {
        extendedProperties = null;
    }

    /**
     * 리소스 로더 세팅
     */
    public void setResourceLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    /**
     * ApplicationContext 세팅
     * 
     * @param applicationContext
     *            to be set by container
     */
    public void setApplicationContext(ApplicationContext applicationContext)
            throws BeansException {
        this.messageSource = (MessageSource) applicationContext
                .getBean("messageSource");
    }

    /**
     * 파일위치정보를 가지고 resources 정보 추출
     * 
     * @param location
     *            파일위치
     * @param encoding
     *            Encoding 정보
     * @throws Exception
     */
    private void loadPropertyResources(String location, String encoding)
            throws Exception {

        if (resourceLoader instanceof ResourcePatternResolver) {
            try {
                Resource[] resources = ((ResourcePatternResolver) resourceLoader)
                        .getResources(location);

                loadPropertyLoop(resources, encoding);
            } catch (IOException ex) {
                throw new BeanDefinitionStoreException(
                        "Could not resolve Properties resource pattern ["
                                + location + "]", ex);
            }
        } else {

            Resource resource = resourceLoader.getResource(location);
            loadPropertyRes(resource, encoding);
        }

    }

    /**
     * 멀티로 지정된 경우 처리를 위해 LOOP 처리
     * 
     * @param resources
     *            리소스정보
     * @param encoding
     *            인코딩정보
     * @throws Exception
     */
    private void loadPropertyLoop(Resource[] resources, String encoding)
            throws Exception {
        Assert.notNull(resources, "Resource array must not be null");
        for (int i = 0; i < resources.length; i++) {
            loadPropertyRes(resources[i], encoding);
        }
    }

    /**
     * 파일 정보를 읽어서 props에 저장
     * 
     * @param resources
     *            리소스정보
     * @param encoding
     *            인코딩정보
     * @throws Exception
     */
    private void loadPropertyRes(Resource resource, String encoding)
            throws Exception {
        if (PropertyService.LOGGER.isDebugEnabled()) {
            PropertyService.LOGGER.debug(messageSource.getMessage(
                    "debug.properties.filename",
                    new String[] { resource.getFilename(), encoding },
                    Locale.getDefault()));
        }
        ExtendedProperties props = null;
        InputStream is = null;

        try {
            props = new ExtendedProperties();
            is = resource.getInputStream();
            props.load(is, encoding);
            extendedProperties.combine(props);
        } catch (Exception e) {
            logger.error("Exception StackTrace - ", e);
        } finally {
            if (is != null)
                is.close();
        }
    }
}
